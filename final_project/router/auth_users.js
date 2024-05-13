const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
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

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
