import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import { Postgres } from "../../config/database";
import { QueryResult } from "pg";

@Controller({
  basepath: "/example",
  middlewares: ["auth"],
})
export default class ExampleController {
  constructor(private readonly db = Postgres, private Results: QueryResult) {}

  @Http.Get({
    path: "/hello",
    middleware: ["logger"],
  })
  async index(request: Request, response: Response) {
    const query = await this.db
      .query("SELECT * FROM ringkasan_saham", {
        resultType: this.Results,
        resultKey: "rows",
      })
      .then((result) => result);
    response.json(query);
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
