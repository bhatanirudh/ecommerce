const paypal=require('paypal-rest-sdk');

const Product = require('../models/product');
const db= require('../config/mongoose'); 
const { request } = require('http');
paypal.configure({
    'mode':'sandbox',
    'client_id':'AZrkZ5pQA9oAhUmPzB4MPSoCVbW_2bJgsYg8h62Nl9BhSbNmSWZJznTdihPky2ICl32DPJel8sAJVJV2',
    'client_secret':process.env.secret
});
function totalsum(cart,req){
    var total=0;
    for(let i=0;i<cart.length;i++){
        total=total+(parseInt(cart[i].price)*parseInt(cart[i].quantity));// To myself, Hi anirudh, Do not forget parseint(),else you would be scratching your head for hours
    }
    req.session.total=total; 
    return total; 
}

module.exports.remove_product=function(req,res){
    
    var id=req.body.id;
    var cart=req.session.cart;

    console.log("Cart Controller",cart);

    for(let i=0;i<cart.length;i++){
        if(cart[i].id==id){
            cart.splice(cart.indexOf(i),1);   // removing product from cart
        }
    }
   

    var total = totalsum(cart,req);


    return res.redirect('back');

}

module.exports.increase_qty=function(req,res){

    var id=req.body.id;
    var quantity=req.body.quantity;
    var cart=req.session.cart;

    for(let i=0;i<cart.length;i++){
        if(cart[i].id==id){
                cart[i].quantity=parseInt(cart[i].quantity)+1;
        }
    }
    var total = totalsum(cart,req);
     res.redirect('back');
}

module.exports.decrease_qty=function(req,res){
    var id=req.body.id;
    var quantity=req.body.quantity;
    var cart=req.session.cart;

    for(let i=0;i<cart.length;i++){
        if(cart[i].id==id){
            if(parseInt(cart[i].quantity)>1)
                cart[i].quantity=parseInt(cart[i].quantity)-1;
        }
    }
    var total = totalsum(cart,req);
     res.redirect('back');
}

module.exports.checkout=function(req,res){
    const cart=req.session.cart;
    var quantity=0;
    for(let i=0;i<cart.length;i++){
        quantity=quantity + parseInt(cart[i].quantity);
    }
    var total = totalsum(cart,req);

    res.render('checkout',{
        totalprice: total ,
    totalQuantity:quantity});
}

module.exports.pay=function(req,res){

    var name=req.body.name;
    var quantity=req.body.quantity;
    console.log(quantity);
    var text = quantity.toString();

    var total = parseInt(req.body.totalprice) + 199;
    
        const create_payment_json = {
          "intent": "sale",
          "payer": {
              "payment_method": "paypal"
          },
          "redirect_urls": {
              "return_url": "https://ecommerceanirudh.herokuapp.com/success" ,
              "cancel_url": "https://ecommerceanirudh.herokuapp.com/cancel"
          },
          "transactions": [{
              "item_list": {
                  "items": [{
                      "name": "ALL ITEMS",
                      "price": total,
                      "currency": "USD",
                      "quantity": "1"
                  }]
              },
              "amount": {
                  "currency": "USD",  //usd since paypal is not accepting INR
                  "total": total
              },
              "description": "E-Commerece TOTAL Dummy"
          }]
      };
       
      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
      });
       
      
}

module.exports.sucess=function(req, res){
    var total = parseInt(req.body.totalprice) + 199;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
   
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": total
          }
      }]
    };
   
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  }

  module.exports.cancel=function(req,res){
    res.send('Cancelled');
  }