import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import { createProductController, getProductController } from '../controllers/productController.js'

const router = express.Router()

//routes

//crete new product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//get products
router.get('/get-product', getProductController)

export default router;