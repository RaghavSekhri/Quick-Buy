const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.get('/',(req,res)=>{
    console.log(req.body)
    res.json({
        msg:'Running'
    })
})

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json({ status: user.email + ' registered!' })
                })
                .catch(err => {
                    res.json({
                        error : err
                    })
                })
            })
        }
        else {
            res.json({ error: '* User already exists' })
        }
    })
    .catch(err => {
        res.json({
            error : err
        })
    })
})

users.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY)
                res.send(token)
                console.log(token);
            }
            else {
                res.json({error: "User does not exist"})
            }
        }
        else {
            res.json({error: "User does not exist"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

module.exports = users





































// users.get('/profile', (req, res) => {
//     var decoded = jwt.verify(req.headers['authorization'], process.env,SECRET_KEY)

//     User.findOne({
//         _id: decoded._id
//     })
//     .then(user => {
//         if(user) {
//             res.json(user)
//         }
//         else {
//             res.send("User does not exist")
//         }
//     })
//     .catch(err => {
//         res.send('eroor: ' + err)
//     })
// })