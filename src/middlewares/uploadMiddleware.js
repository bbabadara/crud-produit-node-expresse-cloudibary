const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration du stockage sur Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Le nom du dossier dans Cloudinary
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // Types de fichiers autorisés
  },
});

// Création du middleware multer
const upload = multer({ storage: storage });

module.exports = upload;
