const router         = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload         = require('../middlewares/uploadMiddleware');
const ctrl           = require('../controllers/ProductController');


router.use(authMiddleware);


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestion des produits
 */


/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Récupère la liste des produits (non supprimés)
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', ctrl.getAll);


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Récupère un produit par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Détails du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 */
router.get('/:id', ctrl.getById);


// /**
//  * @swagger
//  * /api/products:
//  *   post:
//  *     tags: [Products]
//  *     summary: Crée un nouveau produit
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ProductInput'
//  *     responses:
//  *       201:
//  *         description: Produit créé
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  */
// router.post('/', ctrl.create);


/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Crée un nouveau produit avec une image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image à télécharger pour le produit
 *     responses:
 *       201:
 *         description: Produit créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', upload.single('image'), ctrl.create);



/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Met à jour un produit existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Produit mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 */
router.put('/:id', ctrl.update);


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Supprime (soft-delete) un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     responses:
 *       204:
 *         description: Produit supprimé
 *       404:
 *         description: Produit non trouvé
 */
router.delete('/:id', ctrl.delete);


module.exports = router;
 
