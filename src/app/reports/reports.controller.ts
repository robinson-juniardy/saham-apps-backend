import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import ReportsService from "./reports.service";
import xlsx from "node-xlsx";

/**
 * file created detail
 * Reports Controller
 * created At : Thu Apr 13 2023 11:01:47 GMT+0800 (Central Indonesia Time)
 */

@Controller({
  basepath: "/api/reports",
})
export default class Reports {
  constructor(private reportsService: ReportsService = new ReportsService()) {}
  @Http.Get({
    path: "/financial-report",
  })
  async FinancialReport(request: Request, response: Response) {
    const data = await this.reportsService
      .getFinancialReport("rows")
      .then((data) => {
        response.json({
          status: true,
          message: "success",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        response.json({
          status: false,
          message: "failed to retrieve data",
          data: null,
        });
      });
  }

  @Http.Post({
    path: "/financial-report",
    extensions: [AppExtensions.Multer.single("file")],
  })
  async UploadFinancialReport(request: Request, response: Response) {
    const file = request.file.path;

    if (!file) {
      response.status(400).json({
        status: false,
        message: "No File is Selected",
        data: null,
      });
    } else {
      const excelData = xlsx.parse(file);

      for (let i = 1; i < excelData[1].data.length; i++) {
        console.log(excelData[1].data[i][0]);
        if (excelData[1].data[i][0]) {
          (await this.reportsService.saveFinancialReport()).save({
            kode_saham: excelData[1].data[i][0],
            quarter: excelData[1].data[i][1],
            year: String(excelData[1].data[i][1]).split("q")[0],
            sales: isNaN(parseInt(excelData[1].data[i][3]))
              ? 0
              : parseInt(excelData[1].data[i][3]),
            asset: isNaN(parseInt(excelData[1].data[i][4]))
              ? 0
              : parseInt(excelData[1].data[i][4]),
            liability: isNaN(parseInt(excelData[1].data[i][5]))
              ? 0
              : parseInt(excelData[1].data[i][5]),
            equity: isNaN(parseInt(excelData[1].data[i][6]))
              ? 0
              : parseInt(excelData[1].data[i][6]),
            op_profit: isNaN(parseInt(excelData[1].data[i][7]))
              ? 0
              : parseInt(excelData[1].data[i][7]),
            net_profit: isNaN(parseInt(excelData[1].data[i][8]))
              ? 0
              : parseInt(excelData[1].data[i][8]),
            ceps: isNaN(parseInt(excelData[1].data[i][9]))
              ? 0
              : parseInt(excelData[1].data[i][9]),
          });
        }
      }
      response.json({
        status: true,
        message: "Berhasil Upload",
        data: null,
      });
    }
  }
}
