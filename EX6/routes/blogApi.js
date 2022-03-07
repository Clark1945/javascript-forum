var express=require("express");
var router=express.Router();
var memberModel=require("../models/memberModel");
var articleModel=require("../models/articleModel")


router.post("/addArticle",function(req,res){
    var newarticle= new articleModel({
        account:req.body.account,
        name:req.body.name,
        type:req.body.type,
        title:req.body.title,
        content:req.body.content,
        like:[],
        comment:[],
        postdate:new Date()
    });
    newarticle.save(function(err,data){
        if(err){
            res.json({'status':1,'msg':'eror'});
        }
        else{
            res.json({'status':0,'msg':'success','data':data});
        }
    });
});

router.get('/getArticle',function(req,res){
    var type=(req.query.type!=undefined)?
    req.query.type:"";
    var account=(req.query.account!=undefined)?
    req.query.account:"";
    var title=(req.query.title!=undefined)?
    req.query.title:"";

    articleModel.find({
        "account":account!=""?account:{$regex: '.*'+account+'.*'},
        "type": {$regex: '.*'+type+'.*'},
        "title":{$regex: '.*'+title+'.*'}
    },function (err,data){
        if(err){
            console.log(err);
        }
        res.json({'type':type,'data':data});
    });
});
module.exports=router;

