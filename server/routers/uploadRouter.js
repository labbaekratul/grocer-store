const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  cloudinary.config({
    cloud_name: "oikkosme",
    api_key: "714747544475113",
    api_secret: "ANhL_Cu6zxZqk3sENRoIR5Po5Pc",
  });
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  const result = await streamUpload(req);
  res.send(result.url);
});
module.exports = uploadRouter;
