import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";

@Controller({
  basepath: "/example",
  middlewares: ["auth"],
})
export default class ExampleController {
  @Http.Get({
    path: "/hello",
    middleware: ["logger"],
  })
  index(request: Request, response: Response) {
    response.json("is an example api");
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
