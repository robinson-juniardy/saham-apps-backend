import path from "path";
import fs from "fs";
import { ExtractControllerMetadata } from "../decorators/utils";
import express, { Handler } from "express";
import { IRouter } from "../decorators/interfaces/router.interface";

export function getControllers() {
  const basepath = path.join(process.cwd(), "src/app");

  const main_app_project_list = fs.readdirSync(basepath);
  let main_app_fullpath_dir_list: string[] = [];
  let main_app_controller_list: string[] = [];
  let main_app_controller_class_list: any[] = [];

  for (let projectlist of main_app_project_list) {
    main_app_fullpath_dir_list = main_app_fullpath_dir_list.concat(
      path.join(basepath, projectlist)
    );
  }

  for (let fullpath of main_app_fullpath_dir_list) {
    const controllers = fs.readdirSync(fullpath);

    for (let c of controllers) {
      if (c.split(".")[1] === "controller") {
        main_app_controller_list = main_app_controller_list.concat(
          path.join(fullpath, c)
        );
      }
    }
  }

  for (let controller of main_app_controller_list) {
    let instance = require(controller).default;
    main_app_controller_class_list =
      main_app_controller_class_list.concat(instance);
  }

  return main_app_controller_class_list;
}

export function createRouters<T>(Controller: new (...args: any[]) => T) {
  const ControllerMetadata = ExtractControllerMetadata(Controller);

  const instances: {
    [propertyKey: string]: Handler;
  } = new Controller() as any;

  const Router = express.Router();

  const RouterInstance: IRouter[] = ControllerMetadata.routers;

  RouterInstance.forEach((instance) => {
    if (instance.extensions) {
      Router[instance.method](
        ControllerMetadata.basepath + instance.path,
        [
          ...ControllerMetadata.middlewares,
          ...instance.middlewares,
          ...instance.extensions,
        ],
        instances[String(instance.handlerName)].bind(instances)
      );
    } else {
      Router[instance.method](
        ControllerMetadata.basepath + instance.path,
        [...ControllerMetadata.middlewares, ...instance.middlewares],
        instances[String(instance.handlerName)].bind(instances)
      );
    }
  });

  return Router;
}

export abstract class Routes {
  static autoload() {
    let ctx = getControllers();
    let crouter = ctx.map((controller) => {
      return createRouters(controller);
    });
    return crouter;
  }
}
