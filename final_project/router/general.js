const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username, password}= req.body;

  if(!username || !password) {
    return res.status(400).json({message:"username or password are required"})

  }
  const userExists = users.some(user => user.username===username);

  if (userExists){
    return res.status(409).json({message: "Username already exists"});
  }

  users.push({username, password});
  return res.status(201).json({ message: "User registered successfully"});
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function(req, res) {
    if(books){
       return res.send(JSON.stringify(books, null, 4));
    } else {
       return res.status(404).json({error: "there are no books"});
    }

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
if(books){  
    if(books[isbn]){
        return res.send(JSON.stringify(books[isbn], null,4))
    } else{
        return res.status(404).json({error: "there are no books data"});

    }}else{
        return res.status(404).json({error: "there are no books"});

    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let booksByAuthor = [];

    const isbnk = Object.keys(books);

    isbnk.forEach((isbn)=>{
        if(books[isbn] && books[isbn].author === author){
            booksByAuthor.push(books[isbn]);

        }
    });

    if (booksByAuthor.length>0){
        res.send(booksByAuthor);

    }else{
        res.status(404).send({message: "Author not found"})
    }
  //Write your 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const reqTitle = req.params.title;
    let booksByTitle = [];
    const isbnk = Object.keys(books);

    isbnk.forEach((isbn)=> {
      if(books[isbn]&& books[isbn].title===reqTitle){
        booksByTitle.push(books[isbn]);
      }
    });
    if(booksByTitle.length>0){
        req.send(booksByTitle);
    } else{
        res.status(404).send({message: "Title not found"})
    }
    }
  //Write your code here
 );

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});



module.exports.general = public_users;



