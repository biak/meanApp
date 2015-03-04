var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var mongojs = require("mongojs");

var dbCon = require('mongojs').connect('mongodb://biak:biak123@ds061558.mongolab.com:61558/clienttable');
var db = dbCon.collection('clientTable');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'public'))); 

app.get("/clients",function(req,res){
	db.find(function(err,docs){
		res.json(docs);
	});
});

app.post("/clients",function(req,res){
	 
	db.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

app.delete("/clients/:id",function(req,res){
		var id = req.params.id;
		
		db.remove({_id:dbCon.ObjectId(id)},function(err,doc){
			res.json(doc);
		});
});

app.put("/clients/:id",function(req,res){
	var id = req.params.id;
	console.log(req.body);
	db.save({_id:dbCon.ObjectId(id),
	name:req.body.name},function(err,doc){
			res.json(doc);
		});
});

app.get("/clients/:id",function(req,res){
		var id = req.params.id;
		db.findOne({_id:dbCon.ObjectId(id)},function(err,doc){
		res.json(doc);
});
});


app.listen(process.env.PORT || 5000);
