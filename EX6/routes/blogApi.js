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
router.get('/getArticleById',function(req,res){
    articleModel.find({
        _id:req.query._id
    },function(err,data){//data為找到的文章資料
        if(data==undefined){
            res.json({'status':1,"msg":"無此文章"});
        }
        else{
            memberModel.find({
                account:data[0].account},
                function(err,mem){//mem為找到的會員資料
                    res.json({
                        "status":0,
                        "msg":"success",
                        "data":{
                            account:data[0].account,
                            type:data[0].type,
                            title:data[0].title,
                            content:data[0].content,
                            like:data[0].like,
                            comment:data[0].comment,
                            postdate:data[0].postdate,
                            name:mem[0].name
                        }
                    });
                });
        }
    });
});
module.exports=router;

