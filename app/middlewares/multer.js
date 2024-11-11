const Multer = require("multer");
const maxSize = 2 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(
            {
                message: "Unsupported file format",
            },
            false,
        );
    }
};

const processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: maxSize },
    fileFilter: fileFilter,
});

module.exports = processFile;
