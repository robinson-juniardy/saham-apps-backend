import multer from "multer";
import path from "path";

export default abstract class AppExtensions {
  public static Multer = multer({
    dest: path.join(__dirname, "../public/uploads"),
  });
}
