import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import SetupService from "./setup.service";

/**
 * file created detail
 * Setup Controller
 * created At : Sun Dec 04 2022 23:19:59 GMT+0800 (Central Indonesia Time)
 */

@Controller({
  basepath: "/api/setup",
})
export default class Setup {
  constructor(private setupService: SetupService = new SetupService()) {}
  @Http.Get({
    path: "/remarks_referensi",
  })
  async GetSetupRemarksReferensi(request: Request, response: Response) {
    this.setupService
      .SetupRemarksReferensi()
      .then((data) => {
        response.json({
          status: true,
          message: "success",
          data: data,
        });
      })
      .catch((error) => {
        response.json({
          status: false,
          message: error,
          data: null,
        });
      });
  }
}
