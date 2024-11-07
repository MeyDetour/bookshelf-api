
const multer = require('multer');


const storage = multer.diskStorage({
    destination:  './uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

function uploadImage(req, res) {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(500).send('Error uploading file.');
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        console.log(`Image uploaded: ${req.file.filename}`);
        res.send('File uploaded successfully.');
    });
}


module.exports = uploadImage;