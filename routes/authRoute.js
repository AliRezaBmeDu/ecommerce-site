import express from 'express';
import { registerController,
        loginController,
        testController,
        forgotPasswordController, 
        updateProfileController, 
        getOrdersController,
        getAllOrdersController,
        orderStatusController} from  '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router()

//routing
//Register || method post
router.post('/register', registerController)

//Login || method post
router.post('/login', loginController)

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get('/test', requireSignIn, isAdmin, testController)

// protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

// update profile
router.put('/profile', requireSignIn, updateProfileController)

// orders
router.get('/order', requireSignIn, getOrdersController)

// all orders
router.get('/all-order', requireSignIn, isAdmin, getAllOrdersController)

// order status update
router.put('/order-status/:orderId', registerController, isAdmin, orderStatusController)

export default router
