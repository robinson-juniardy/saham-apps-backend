import { IController, IMethods } from "./interfaces/controller.interface";
import AppMiddleware from "../../middleware/AppMiddleware";
import { CoreMetadata } from "./metadata.keys";
import { GenericClassDecorator, TMethods } from "./types/common";
import { IRouter } from "./interfaces/router.interface";
import { Type } from "./interfaces/service.interface";
export function Controller(
  options: IController<AppMiddleware>
): ClassDecorator {
  return (target: any) => {
    let middlewares: Function[] = [];
    if (options.middlewares) {
      for (let mdw of options.middlewares) {
        middlewares = middlewares.concat(new AppMiddleware()[mdw]);
      }
    }

    const controllers_metadata = {
      basepath: options.basepath,
      middlewares: middlewares,
    };

    Reflect.defineMetadata(
      CoreMetadata.controllers,
      controllers_metadata,
      target
    );
  };
}

export function MethodDecoratorFactory(methods: TMethods) {
  return (options: IMethods<AppMiddleware>): MethodDecorator => {
    return (target: any, propertyKey: PropertyKey) => {
      const instance = target.constructor;

      let middlewares: Function[] = [];

      if (options.middleware) {
        for (let mdw of options.middleware) {
          middlewares = middlewares.concat(new AppMiddleware()[mdw]);
        }
      }

      const routers: IRouter[] = Reflect.hasMetadata(
        CoreMetadata.router,
        instance
      )
        ? Reflect.getMetadata(CoreMetadata.router, instance)
        : [];

      routers.push({
        method: methods,
        path: options.path,
        handlerName: propertyKey,
        extensions: options.extensions,
        middlewares,
      });

      Reflect.defineMetadata(CoreMetadata.router, routers, instance);
    };
  };
}

export function Service(): GenericClassDecorator<Type<object>> {
  return (target: Type<object>) => {};
}

export abstract class Http {
  static Get = MethodDecoratorFactory("get");
  static Post = MethodDecoratorFactory("post");
  static Put = MethodDecoratorFactory("put");
  static Patch = MethodDecoratorFactory("patch");
  static Delete = MethodDecoratorFactory("delete");
}
