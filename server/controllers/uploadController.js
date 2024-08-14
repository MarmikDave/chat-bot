const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
    res.status(200).json({ message: "File uploaded successfully", file: req.file });
};

module.exports = { upload, uploadFile };
