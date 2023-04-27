import { Request, Response } from "express";
import { Controller, Http } from "../../core/decorators";
import AppExtensions from "../../middleware/AppExtensions";
import RingkasanService from "./ringkasan.service";
import axios from "axios";
import moment from "moment";
import xlsx from "node-xlsx";

/**
 * file created detail
 * Ringkasan Controller
 * created At : Sun Dec 04 2022 20:58:13 GMT+0800 (Central Indonesia Time)
 */

@Controller({
  basepath: "/api/ringkasan",
})
export default class Ringkasan {
  constructor(
    private ringkasanService: RingkasanService = new RingkasanService()
  ) {}

  @Http.Post({
    path: "/saham",
    extensions: [AppExtensions.Multer.single("file")],
  })
  async createRingkasanSaham(request: Request, response: Response) {
    const file = request.file.path;

    console.log(file);
    const tanggalRingkasan = request.file.originalname
      .split("-")[1]
      .split(".")[0];

    if (!file) {
      response.status(400).json({
        status: false,
        message: "No File is Selected",
        data: null,
      });
    } else {
      const excelData = xlsx.parse(file);

      for (let i = 1; i < excelData[0].data.length; i++) {
        (await this.ringkasanService.insertMasterSaham()).save({
          kode_saham: excelData[0].data[i][1],
          nama_perusahaan: excelData[0].data[i][2],
          created_date: moment(new Date()).format("YYYY-MM-DD"),
          created_by: "upload_system",
        });
        (await this.ringkasanService.UploadRIngkasanSaham()).save({
          kode_master_saham: excelData[0].data[i][1],
          kode_saham: excelData[0].data[i][1],
          nama_perusahaan: excelData[0].data[i][1],
          remarks: excelData[0].data[i][3],
          sebelumnya: excelData[0].data[i][4],
          open_price: excelData[0].data[i][5],
          last_trading_date: excelData[0].data[i][6],
          first_trade: excelData[0].data[i][7],
          tertinggi: excelData[0].data[i][8],
          terendah: excelData[0].data[i][9],
          penutupan: excelData[0].data[i][10],
          selisih: excelData[0].data[i][11],
          volume: excelData[0].data[i][12],
          nilai: excelData[0].data[i][13],
          frekuensi: excelData[0].data[i][14],
          index_individual: excelData[0].data[i][15],
          offer: excelData[0].data[i][16],
          offer_volume: excelData[0].data[i][17],
          bid: excelData[0].data[i][18],
          bid_volume: excelData[0].data[i][19],
          listed_shared: excelData[0].data[i][20],
          tradeble_shares: excelData[0].data[i][21],
          weight_for_index: excelData[0].data[i][22],
          foreign_sell: excelData[0].data[i][23],
          foreign_buy: excelData[0].data[i][24],
          non_regular_volume: excelData[0].data[i][25],
          non_regular_value: excelData[0].data[i][26],
          non_regular_frequency: excelData[0].data[i][27],
          created_date: moment(new Date()).format("YYYY-MM-DD"),
          created_by: "upload_system",
          tanggal_ringkasan: moment(tanggalRingkasan).format("YYYY-MM-DD"),
        });
      }

      response.json({
        status: true,
        message: "Berhasil Upload",
        data: null,
      });
    }
  }

  @Http.Post({
    path: "/saham/singkron",
  })
  async createSingkron(request: Request, response: Response) {
    const data = await axios
      .get(
        "https://old.idx.co.id/umbraco/Surface/TradingSummary/GetStockSummary",
        {
          params: {
            length: 10000,
            date: 20221230,
            _: 1672579187887,
          },
          headers: {
            "Accept-Encoding": "gzip",
            Accept: "application/json",
            authority: "old.idx.co.id",
          },
        }
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    response.json({
      status: 1,
      message: "success",
      data: data,
    });
  }

  @Http.Post({
    path: "/indeks",
    extensions: [AppExtensions.Multer.single("file")],
  })
  async createRingkasanIndeks(request: Request, response: Response) {
    const file = request.file.path;

    const tanggalRingkasan = request.file.originalname
      .split("-")[1]
      .split(".")[0];

    if (!file) {
      response.status(400).json({
        status: false,
        message: "No File is Selected",
        data: null,
      });
    } else {
      const excelData = xlsx.parse(file);
      for (let i = 2; i < excelData[0].data.length; i++) {
        await (
          await this.ringkasanService.insertMasterKlasifikasiIndeks()
        ).save({
          kode_index: excelData[0].data[i][1],
          klasifikasi: "index",
          nama_index: String(excelData[0].data[i][1] + "Index"),
        });
        await (
          await this.ringkasanService.UploadRingkasanIndeks()
        ).save({
          kode_klasifikasi_index: excelData[0].data[i][1],
          sebelumnya: excelData[0].data[i][2],
          tertinggi: excelData[0].data[i][3],
          terendah: excelData[0].data[i][4],
          penutupan: excelData[0].data[i][5],
          stock: excelData[0].data[i][6],
          selisih: excelData[0].data[i][7],
          volume: excelData[0].data[i][8],
          nilai: excelData[0].data[i][9],
          frekuensi: excelData[0].data[i][10],
          kapitalisasi_pasar: excelData[0].data[i][11],
          tanggal_ringkasan: moment(tanggalRingkasan).format("YYYY-MM-DD"),
          created_date: moment(new Date()).format("YYYY-MM-DD"),
        });
      }
      response.json({
        status: true,
        message: "Berhasil Upload",
        data: null,
      });
    }
  }

  @Http.Get({
    path: "/saham",
  })
  async GetRingkasanSaham(request: Request, response: Response) {
    this.ringkasanService
      .getRingkasanSaham()
      .then((values) => {
        response.json({
          status: true,
          message: "success",
          data: values,
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
    path: "/indeks",
  })
  async GetRingkasanIndeks(request: Request, response: Response) {
    this.ringkasanService
      .getRingkasanIndeks()
      .then((value) => {
        response.json({
          status: true,
          message: "success",
          data: value,
        });
      })
      .catch((error) => {
        console.log(error);
        response.json({
          status: false,
          message: error,
          data: null,
        });
      });
  }
}
