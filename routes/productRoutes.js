import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import { createProductController } from '../controllers/productController.js'

const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)


export default router;