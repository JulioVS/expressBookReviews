const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    users.push({"username":username, "password":password});
    return res.status(200).json({message: "User successfully registered"});
  } else {
    return res.status(404).json({message: "Credentials not provided"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        console.log("Inside GET/ Promise")
        resolve(JSON.stringify(books,null,4))
    })
    myPromise.then((data) => {
        console.log("Inside GET/ Then")
        return res.send(data)
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        console.log("Inside GET/isbn/ Promise")
        resolve(books[req.params.isbn])
    })
    myPromise.then((data) => {
        console.log("Inside GET/isbn/ Then")
        return res.send(data)
    })
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let index = 0;
    let selected = [];

    let myPromise = new Promise((resolve,reject) => {
        console.log("Inside GET/author/ Promise")
        for (index in books) {
            if (books[index]['author'] == author) {
                selected.push(books[index])  
            }
        };    
        resolve(selected)
    })
    myPromise.then((data) => {
        console.log("Inside GET/author/ Then")
        return res.send(data)
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let index = 0;
    let selected = [];

    let myPromise = new Promise((resolve,reject) => {
        console.log("Inside GET/title/ Promise")
        for (index in books) {
            if (books[index]['title'] == title) {
                selected.push(books[index])  
            }
        };    
        resolve(selected)
    })
    myPromise.then((data) => {
        console.log("Inside GET/title/ Then")
        return res.send(data)
    })
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn]['reviews']);  
});

module.exports.general = public_users;
