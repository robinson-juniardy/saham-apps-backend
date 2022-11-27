import express from "express";
import { TPropsOf, TMethods } from "../types/common";
export interface IController<middleware> {
  basepath: string;
  middlewares?: Array<TPropsOf<middleware>>;
}

export interface IMethods<middlewre> {
  path: string;
  middleware?: Array<TPropsOf<middlewre>>;
  extensions?: Array<any>;
}

export interface IControllerMetadata {
  basepath: string;
  middlewares: any;
  routers: Array<{
    method: TMethods;
    path: string;
    handlerName: PropertyKey;
    middlewares: Function[];
  }>;
}
