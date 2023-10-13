import { Request } from "express";
import { Constants } from "../config/constants";

const multer = require('multer');

const imageFilter = async (req: Request, file: any, cb: any) => {// NOSONAR
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(Constants.ONLY_IMAGE, false);
  }
};


const fileStrogeEngine = multer.diskStorage({ // NOSONAR
  destination: (req, file, cb) => {// NOSONAR
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {// NOSONAR
    const imageType = file.originalname.replace(" ", "_")
    cb(null, `${imageType}`)
  }
})

const imageUpload = multer({
  storage: fileStrogeEngine,
  fileFilter: imageFilter,
  limits: {
    fileSize: Constants.IMAGE_SIZE,
  }
})


export default imageUpload;