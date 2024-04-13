const express = require('express');
const multer = require('multer');
const m = require('./mongodb');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const { fname } = req.body;
  const fileName = req.file.filename;
console.log(fileName)
  try {
    await m.create({
      fname: fname,
      file: fileName,
    });
    res.json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3100, () => {
  console.log('Server is running on port 3100');
});
