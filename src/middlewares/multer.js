import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';


const storage = cloudinaryStorage({
  cloudinary,
  folder: 'barefoot_nomad',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});

const multerUploads = multer({ storage }).any();

const imageUpload = async (req, res, next) => {
  try {
    const imagesArr = [];
    req.files.forEach(file => {
      imagesArr.push(file.secure_url);
    });
    req.images = imagesArr;
    return next();
  } catch (err) {
    return next(err);
  }
};

export { multerUploads, imageUpload };
