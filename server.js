//Main get/post javascript file

//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var friends = require('./app/data/friends');

//Handle to the friendsList
var friendsList = friends.friendsList;

// For Importing later on, figure this out later
// var api = require('./apps/routing/apiRoutes.js');
// var HTML = require('./apps/routing/htmlRoutes.js');

console.log(friends.friendsList[0]);
//Maybe if time permits, do this using database
// var MySQL = require('mysql');

//Handles
var app = express();
var port = process.env.PORT || 3000;

//Express Middle-Ware
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//For static stuff
app.use(express.static(path.join(__dirname, 'app/public')));

//To go in htmlRoutes.js
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

//To go in apiRoutes.js
app.post("/api/new", function(req, res) {
    var newFriend = req.body;
    //If there are already 5 tables waiting
    console.log(newFriend.name);
    friendsList.push(newFriend);
});

app.get("/api/friends", function(req, res) {
	res.send(friendsList);
});

//Start Server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});