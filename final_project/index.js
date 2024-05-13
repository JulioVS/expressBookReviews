const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
let users = require("./router/auth_users.js").users;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    if (req.session.authorization) {
        token = req.session.authorization['accessToken'];
        jwt.verify(token, "access", (err,user) => {
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({message: "User not authenticated"})
            }
        });
    } else {
        return res.status(403).json({message: "User not logged in"})
    }
});

app.use("/customer/login", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (!username || !password) {
        return res.status(404).json({message: "Insufficient data for login"})
    };

    let validusers = users.filter((u) => {
        return (u.username == username && u.password == password)
    });

    if (validusers.length > 0) {
        let accessToken = jwt.sign( {data: password}, 'access', {expiresIn: 60} )
        req.session.authorization = { accessToken, username }
        
        return res.status(200).json({message: "User logged in, correct credentials"})
    } else {
        return res.status(404).json({message: "Invalid credentials"})
    };
});

const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
