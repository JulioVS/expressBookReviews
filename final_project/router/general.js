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
  return res.send(JSON.stringify(books,null,4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.send(books[req.params.isbn])
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let index = 0;
  let selected = [];
  
  for (index in books) {
    if (books[index]['author'] == author) {
        selected.push(books[index])  
    }
  };
  return res.send(selected);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let index = 0;
    let selected = [];

    for (index in books) {
      if (books[index]['title'] == title) {
          selected.push(books[index])  
      }
    };
    return res.send(selected);
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn]['reviews']);  
});

module.exports.general = public_users;
