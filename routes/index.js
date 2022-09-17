const express=require('express');
const homeController=require('../controllers/home_controller');
const cartController=require('../controllers/cart_Controller');
const mailController=require('../controllers/mailerController');
const router=express.Router();

console.log("router is running");

router.get('/',homeController.home);
router.get('/cart',homeController.cart);
router.post('/addToCart',homeController.add_to_cart);
router.post('/remove',cartController.remove_product);
router.post('/increase',cartController.increase_qty);
router.post('/decrease',cartController.decrease_qty);
router.post('/checkout',cartController.checkout);
router.post('/pay',cartController.pay);
router.post('/sucess',cartController.sucess);
router.get('/cancel',cartController.cancel);
router.post('/node_mailer',mailController.link);


// for any routes use from here
// router.use('/path',require('route to directory'));

module.exports=router;