var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var mongojs = require("mongojs");

var databaseUrl = "mongodb://biak:biak123@ds061558.mongolab.com:61558/clienttable";
var collections = ["clientTable"];
var db = mongojs.connect(databaseUrl, collections);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'public'))); 

app.get("/clients",function(req,res){
	db.clientTable.find(function(err,docs){
		res.json(docs);
	});
});

app.post("/clients",function(req,res){
	 
	db.clientTable.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

app.delete("/clients/:id",function(req,res){
		var id = req.params.id;
		
		db.clientTable.remove({_id:mongojs.ObjectId(id)},function(err,doc){
			res.json(doc);
		});
});

app.put("/clients/:id",function(req,res){
	var id = req.params.id;
	console.log(req.body);
	db.clientTable.save({_id:mongojs.ObjectId(id),
	name:req.body.name},function(err,doc){
			res.json(doc);
		});
});

app.get("/clients/:id",function(req,res){
		var id = req.params.id;
		db.clientTable.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
});
});


app.listen(process.env.PORT || 5000);
