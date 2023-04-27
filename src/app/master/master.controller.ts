import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import MasterService from "./master.service";
import AppExtensions from "../../middleware/AppExtensions";
import moment from "moment";
import xlsx from "node-xlsx";
import excelReader from "xlsx";

/**
 * file created detail
 * Master Controller
 * created At : Sun Dec 04 2022 20:58:46 GMT+0800 (Central Indonesia Time)
 */

@Controller({
  basepath: "/api/master",
})
export default class Master {
  constructor(private masterService: MasterService = new MasterService()) {}

  @Http.Get({
    path: "/saham",
  })
  async GetMasterSaham(request: Request, response: Response) {
    this.masterService
      .MasterSaham()
      .then((values) => {
        response.json({
          status: true,
          message: "success",
          data: values,
        });
      })
      .catch((error) => {
        response.json({
          status: true,
          message: error,
          data: null,
        });
      });
  }

  @Http.Get({
    path: "/klasifikasi_index",
  })
  async GetMasterKlasifikasiIndex(request: Request, response: Response) {
    this.masterService
      .MasterKlasifikasiIndeks()
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

  @Http.Get({
    path: "/group_index",
  })
  async GetMasterGroupIndex(request: Request, response: Response) {
    this.masterService
      .MasterGroupIndex()
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

  @Http.Get({
    path: "/remarks_referensi",
  })
  async GetMasterRemarksReferensi(request: Request, response: Response) {
    this.masterService
      .MasterRemarksReferensi()
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

  @Http.Get({
    path: "/saham/kuartal",
  })
  async GetSahamKuartal(request: Request, response: Response) {
    this.masterService
      .MasterSahamQuarter("rows")
      .then((values) => {
        response.json({
          status: true,
          message: "success",
          data: values,
        });
      })
      .catch((error) => {
        response.json({
          status: true,
          message: error,
          data: null,
        });
      });
  }

  @Http.Post({
    path: "/saham/kuartal/upload",
    extensions: [AppExtensions.Multer.single("file")],
  })
  async UploadSahamQuarter(request: Request, response: Response) {
    const file = request.file.path;

    console.log(file);

    if (!file) {
      response.status(400).json({
        status: false,
        message: "No File is Selected",
        data: null,
      });
    } else {
      const excelData = excelReader.readFile(file);
      let dataFilled = [];
      const sheets = excelData.SheetNames;

      for (let i = 0; i < sheets.length; i++) {
        const temp = excelReader.utils.sheet_to_json(
          excelData.Sheets[excelData.SheetNames[0]]
        );
        temp.forEach((res) => {
          dataFilled.push(res);
        });
      }
      console.log(dataFilled[0]);

      for (let i = 0; i < dataFilled.length; i++) {
        if (dataFilled[i].Quarter) {
          let quarter = dataFilled[i].Quarter
            ? dataFilled[i].Quarter.toLowerCase().split("q")[1]
            : null;
          let year = dataFilled[i].Quarter
            ? dataFilled[i].Quarter.toLowerCase().split("q")[0]
            : null;

          if (dataFilled[i]["IPO Price"] && dataFilled[i]["IPO Shares"]) {
            this.masterService
              .insertMasterSaham("rowCount", {
                kode_saham: dataFilled[i]["Kode Saham"],
                quarter: quarter,
                year: year,
                ipo_price: dataFilled[i]["IPO Price"],
                ipo_shares: dataFilled[i]["IPO Shares"],
                nama_perusahaan: dataFilled[i]["Nama Perusahaan"],
                created_date: moment(new Date()).format("YYYY-MM-DD"),
              })
              .then((val) => val)
              .catch((err) => console.log(err));

            this.masterService
              .InsertProfileSaham("rowCount", {
                kode_saham: dataFilled[i]["Kode Saham"],
                assets: dataFilled[i][" Asset(M) "],
                sales: dataFilled[i]["Sales(M)"],
                liability: dataFilled[i][" Liability "],
                equity: dataFilled[i][" Equity(M) "],
                opP: dataFilled[i][" OpP(M) "],
                np: dataFilled[i]["NP(M)"],
                ceps: dataFilled[i]["CEPS"],
                currency: dataFilled[i]["CUR"],
                dpr: dataFilled[i]["DPR"],
                quarter: quarter,
                year: year,
              })
              .then((val) => val)
              .catch((error) => console.log(error));
          }
        }
      }

      // console.log(excelData[0].data[0]);
      // for (let i = 2; i < excelData[0].data.length; i++) {
      // }
      response.json({
        status: true,
        message: "success",
        data: null,
      });
    }
  }
}
