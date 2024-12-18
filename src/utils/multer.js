/* const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
 */

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure Multer to use /tmp directory for storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');// Cambia 'C:/tmp' por './uploads' o una ruta similar
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadSingle = multer({ storage: storage });

const upload = multer({
  dest: path.join(__dirname, "..", "public", "uploads"),
  storage: multer.memoryStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "..", "public", "uploads");
      // Verificar si el directorio de destino existe, si no, crearlo
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
  }),
});

module.exports = upload;
module.exports = uploadSingle;