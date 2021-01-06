const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require('jsonwebtoken')
const Product = require("../models/datauser")
const UserModel = require("../models/User")
const Order = require('../models/order')

process.env.SECRET_KEY = 'secret'

JwtValidator = (req,res,next)=>{
    console.log(req.headers)
    const token  = req.headers.authorization;
    const bearer = token.split(' ');
    const header = bearer[1];
    console.log(header)
    jwt.verify(header,'secret',(err,authorizedData)=>{
        if(err){
            res.sendStatus(403).json('Session Expired');
        }
        else{
            req.user = authorizedData
            next(); 
        }
    })
}

users.get('/',(req,res)=>{
    console.log(req.body)
   Product.find({}).exec().then(data=>{
        res.json({
            products : data,
            success : true
        })
   }).catch(err=>{
    res.json({
        err : err,
        success : false
    })
   })

});

users.post('/AddtoOrder/:id',async (req,res)=>{
    const today = new Date()
    const sum = req.params.id;
    
    try{
    const decode = await jwt.decode(req.body.token);
    if(decode!==null){
        //console.log(decode);
        let user = await UserModel.findOne({email:decode.email});
        const orderData = {
            email: decode.email,
            address: req.body.address,
            street: req.body.street,
            city: req.body.city,
            pincode: req.body.pincode,
            total: sum,
            created: today,
            orders : user.cart
        }

        Order.create(orderData);
        return res.json({
            message : "Posted Successfully"
        })
    }else{
        return res.json({
            message : "Token Not Provided"
        })
    }
    }catch(err){
       return res.json({
            message : 'Invalid Token'
        })
    }
   })

users.post('/AddtoCart',JwtValidator,(req,res)=>{
    UserModel.findOne({email : req.user.email, 'cart.productId':req.body.id })
	.then(docs=>{
		if(!docs)
		{
			UserModel.update({email:req.user.email},{$push:{'cart':{productId:req.body.id, productQuantity:1, title:req.body.title, img:req.body.img, price:req.body.price, company:req.body.company}}})
			.then(docs=>{
				res.send('Item added in your cart')
			})
			.catch(err=>{
				res.sendStatus(500)
			})
		}
		else{
			res.send('The item is already in your cart')
		}
	})
})

 users.get('/fetchtoCart',JwtValidator,(req,res) =>{
     UserModel.findOne({email : req.user.email})
     .then(user=>{
         console.log(user);
         res.send(user.cart)
            return;
     }).catch(err=>{
         console.log(err);
     })
 })

users.put('/updateInc/:id/:phoneId/:counter',async (req,res)=>{
   const user = await UserModel.findById(req.params.id);
   await user.cart.map(async( eachUser)=>{
       if(eachUser.productId == req.params.phoneId){
            let productQuantity = await parseInt(eachUser.productQuantity);
            productQuantity = productQuantity + parseInt(req.params.counter);
            eachUser.productQuantity = productQuantity;
       }
   })

   const oldUser = await UserModel.findById(req.params.id);

   let success = await UserModel.updateOne(oldUser,user);
   if(success){
       res.json({
           message : 'Kam Tamam',
           user : user
       })
   }else{
       res.json({
           message : 'nayak Nahi khalnayak hoo mai'
       })
   }
})

users.put('/updateDec/:id/:phoneId/:counter',async (req,res)=>{
    const user = await UserModel.findById(req.params.id);
    await user.cart.map(async( eachUser)=>{
        if(eachUser.productId == req.params.phoneId){
             let productQuantity = await parseInt(eachUser.productQuantity);
             productQuantity = productQuantity - parseInt(req.params.counter);
             eachUser.productQuantity = productQuantity;
        }
    })
 
    const oldUser = await UserModel.findById(req.params.id);
 console.log(user)
    let success = await UserModel.updateOne(oldUser,user);
    if(success){
        res.json({
            message : 'Kam Tamam',
            user : user
        })
    }else{
        res.json({
            message : 'nayak Nahi khalnayak hoo mai'
        })
    }
 })

users.delete('/deleteCart/:userId/:productId',async(req,res)=>{
    const user = await UserModel.findById(req.params.userId);
    const newVal = await user.cart.filter(eachPhone=>{
        if(eachPhone.productId!=req.params.productId){
            return eachPhone
        }
        return false;
    });

    console.log(newVal);

    const updateUser = await UserModel.findById(req.params.userId);
    updateUser.cart = newVal;

    const data = await UserModel.updateOne(user , updateUser);
    if(data){
        res.json({
            message : 'Updated Cart',
            user : user
        })
    }else{
        res.json({
            message : 'Failed',
            user : user
        })
    }
})

users.get('/by/:id',(req,res)=>{
    console.log(req.params.id)

    Product.findById(req.params.id)
    .exec()
    .then(data=>{
        res.json({
            phone : data
        })
    })
})

users.post('/datacheck' , (req,res) => {
    const DataProduct = new Product({
        title: req.body.title,
        img: req.body.img,
        price: req.body.price,
        company: req.body.company,
        info: req.body.info,
        inCart: req.body.inCart,
        count: req.body.count,
        total: req.body.total
    })

    DataProduct.save()
    .then(()=>{
        res.json({
            success : 'Ok'
        })
    })
    .catch(err=>{
        console.log(err);
    })
    
})

module.exports = users;