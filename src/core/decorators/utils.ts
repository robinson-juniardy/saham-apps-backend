import { CoreMetadata } from "./metadata.keys";
import { IRouter } from "./interfaces/router.interface";
import { IControllerMetadata } from "./interfaces/controller.interface";
export function ExtractControllerMetadata<T>(
  controller: new (...args: any[]) => T
): IControllerMetadata {
  const controller_metadata = Reflect.hasMetadata(
    CoreMetadata.controllers,
    controller
  )
    ? Reflect.getMetadata(CoreMetadata.controllers, controller)
    : undefined;
  const routers: IRouter[] = Reflect.hasMetadata(
    CoreMetadata.router,
    controller
  )
    ? Reflect.getMetadata(CoreMetadata.router, controller)
    : [];

  return { ...controller_metadata, routers };
}
