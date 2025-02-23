const multer = require("multer");
const ApiError = require("../errors/apiError");

exports.uploadSingleImage = (fieldName) => {
  const STORAGE = multer.memoryStorage();

  const FILE_FILTER = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(
        new ApiError("Invalid file type. Only images are allowed", 400),
        false
      );
    }
  };

  const upload = multer({ storage: STORAGE, fileFilter: FILE_FILTER });

  return upload.single(fieldName);
};
