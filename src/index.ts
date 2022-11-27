import "reflect-metadata";
import Application, { dependency } from "./core/legato/Application";
import { Routes, getControllers } from "./core/routers/routers";
import cors from "cors";
import express from "express";
import path from "path";

new Application(8888, Routes.autoload(), [
  dependency.use(cors()),
  dependency.use(express.json()),
  dependency.use(express.urlencoded({ extended: true })),
  dependency.use(express.static(path.join(__dirname, "public"))),
]);
