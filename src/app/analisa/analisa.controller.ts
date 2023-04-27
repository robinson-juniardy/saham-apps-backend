import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import AnalisaService from "./analisa.service";

/**
 * file created detail
 * Analisa Controller
 * created At : Thu Dec 29 2022 14:37:25 GMT+0800 (Central Indonesia Time)
 */

@Controller({
  basepath: "/analisa",
})
export default class Analisa {
  constructor(private analisaService: AnalisaService = new AnalisaService()) {}
  @Http.Get({
    path: "/saham-kuartal",
  })
  async SahamKuartal(request: Request, response: Response) {
    const result = await this.analisaService
      .getSahamKuartal("rows")
      .then((data) => data)
      .catch((error) => error);

    response.json(result);
  }
}
