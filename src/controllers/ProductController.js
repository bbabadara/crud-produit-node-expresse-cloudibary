const BaseController = require('./BaseController');
const ProductService = require('../services/ProductService');
const upload = require('../middlewares/uploadMiddleware'); // Importer le middleware d'upload

class ProductController extends BaseController {
  constructor() {
    super( ProductService);
  }

  // Créer un produit avec l'upload de l'image
  async create(req, res, next) {
    try {
      // Vérifier si une image a été envoyée
      if (!req.file) {
        return res.status(400).json({ error: 'Une image est requise.' });
      }

      // Récupérer l'URL de l'image uploadée sur Cloudinary
      const  secure_url  = req.file.path;
      
      const price = parseFloat(req.body.price);
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'Le prix doit être un nombre positif.' });
      }

      // Créer un produit avec les données de la requête et l'URL de l'image
      const productData = {
        name: req.body.name,
        description: req.body.description,
        price: price,
        image: secure_url, // Stocker l'URL de l'image dans la base de données
      };

      // Appeler la méthode du service pour créer le produit
      const newProduct = await this.service.create(productData);

      // Retourner le produit créé avec l'URL de l'image
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
