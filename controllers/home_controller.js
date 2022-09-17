const Product = require('../models/product');
const db= require('../config/mongoose'); 
const { request } = require('http');

module.exports.home=function(req,res){
    Product.find({},function(err,products){
       if(err){
           console.log("Error in fething from db");
           return;
       }
       return res.render('index',{
           title:"e_commerce- Anirudh   ",
           product_list: products
                               }); 
     
      });
 
    }

module.exports.add_to_cart=function(req,res){
    const id=req.body.id;
    const quantity=req.body.quantity;
    
    function totalsum(cart,req){
        var total=0;
        for(let i=0;i<cart.length;i++){
            total=total+(parseInt(cart[i].price)*parseInt(cart[i].quantity));// To myself, Hi anirudh, Do not forget parseint(),else you would be scratching your head for hours
        }
        req.session.total=total; 
        return total; 
    }

    function isProductInCart(cart,id){
        for(let i=0;i<cart.length;i++){
            if(cart[i].id==id){
                return true;
            }
        }
        return false;
    }

    Product.findById(id,(error,data)=>{   // finding the product from id to add to the cart;
        if(error){
            console.log(error);
        }
        //else{
        //     console.log(data);   just to check if data was coming from mongoDbAtlas or not
        // }
        var product={id:id,name:data.name,price:data.price,description:data.description,quantity:quantity,image:data.image};
        

          if(req.session.cart){  //checking if its first item in cart or not  
            var cart=req.session.cart;
            if(!isProductInCart(cart)){
                cart.push(product);
            }}else{
                req.session.cart=[product];  // creating cart with first product
                var cart = req.session.cart;
            }
         
          var total = totalsum(cart,req);
        console.log("1",cart);
       console.log(total);
       return res.redirect('/cart'); // lets go to cart page after adding to cart and doing total of qty and amount
        });

    }


 module.exports.cart=function(req,res){ 
 
    const cart=req.session.cart;
    const total=req.session.total;

    console.log(cart);
    console.log(total);
    res.render('cart',{cart:cart,total:total});
    
}

