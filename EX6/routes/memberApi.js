var express = require('express');
var router = express.Router();

var memberModel = require('../models/memberModel');

router.post('/register',function (req,res){
    var newmember = new memberModel({
        name: req.body.name,
        account: req.body.account,
        password: req.body.password,
    });
    memberModel.count({account:req.body.account},function (err,data){  //data是計算後的參數數量 用count找出帳號相符的資料
        if(data>0){
            res.json({'status':1,'msg':'帳號已經被註冊'});
        }
        else{
            newmember.save(function(err,data){
                if(err){
                    res.json({'status':1,'msg':'error'});
                }
                else{
                    res.json({'status':0,'msg':'success','data':data});
                }
            });
        }
    });
});

router.post('/login', function (req, res) {
    memberModel.findOne({
        account: req.body.account,
        password: req.body.password
    }, function (err, data) {
        if (data == null) {
            res.json({ "status": 1, "msg": "帳號密碼錯誤!" });
        }
        else {
            if (err) {
                res.json({ "status": 1, "msg": "error" });
            }
            else {
                res.json({
                    "status": 0, "msg": "success",
                    "data": data
                });
            }
        }
    });
});
router.post('/changePass',function(req,res){
    memberModel.findOne({account:req.body.account,password:req.body.oldPass},function(err,data){
        if(data==null){
            res.json({'status':1,"msg":"舊密碼錯誤"});
        }
        else{
            data.password=req.body.newPass;//取代舊密碼
            data.save(function(err){
                if(err){
                    res.json({'status':1,'msg':'error'});
                }
                else{
                    res.json({'status':0,'msg':'success'});
                }
            });
        }
    });
});
module.exports = router;