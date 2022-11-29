import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import ExampleServices from "./example.services";

@Controller({
  basepath: "/example",
  middlewares: ["auth"],
})
export default class ExampleController {
  constructor(private service: ExampleServices = new ExampleServices()) {}

  @Http.Get({
    path: "/hello",
    middleware: ["logger"],
  })
  async index(request: Request, response: Response) {
    const data: Promise<ExampleServices> = await this.service.GetRingkasanSaham(
      "rows"
    );
    response.json(data);
  }

  @Http.Get({
    path: "/products",
  })
  async products(request: Request, response: Response) {
    const data: Promise<ExampleServices> = await this.service.Getproducts();

    response.json(data);
  }

  @Http.Get({
    path: "/world",
  })
  getSentence(request: Request, response: Response) {
    response.json("is an example world");
  }

  @Http.Post({
    path: "/upload",
    extensions: [AppExtensions.Multer.single("photo")],
  })
  uploadFiles(request: Request, response: Response) {
    response.json({
      file: request.file?.originalname,
    });
  }
}
