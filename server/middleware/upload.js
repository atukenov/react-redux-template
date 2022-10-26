const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
const upload = multer({
  storage,
  fileFilter: multerFilter,
});
const uploadFiles = upload.array("file", 4);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }
    next();
  });
};
const resizeImages = async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      const id = uuid();
      const newFilename = `${id}.jpeg`;
      const newImage = {
        filename: newFilename,
        _id: id,
      };
      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`upload/${newFilename}`);
      req.body.images.push(newImage);
    })
  );
  next();
};

module.exports = {
  uploadImages,
  resizeImages,
};
