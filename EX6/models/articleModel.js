var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ex6-5',{useNewUrlParser:true});

var articleSchema = new mongoose.Schema({
    name:String,
    account:String,
    type:String,
    title:String,
    content:String,
    like:Array,
    comment:Array,
    postdate:Date
});
articleSchema.set('collection','article');
var model = mongoose.model("article",articleSchema); //member 為模組名稱
module.exports = model;