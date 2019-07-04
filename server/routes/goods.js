const express = require('express');
const router = express.Router();
const  mongoose = require('mongoose');
var Goods = require('../models/goods')
var User = require('../models/user')

//连接数据库
mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true});
mongoose.connection.on('connected', function() {
    console.log("mongondb connected success");
})

mongoose.connection.on('error', function() {
    console.log("mongondb connected fail");
})

mongoose.connection.on('disconnected', function() {
    console.log("mongondb connected disconnected");
})
router.get("/list", function(req, res, next) {

    let sort = req.param('sort');
    let priceLevel = req.param('priceLevel');
    let priceGt = '',
        priceLte = '';

    let param = {};

    if (priceLevel != 'all') {
        // switch (priceLevel) {
        //     case '0':
        //         priceGt = 0;
        //         priceLte = 100;
        //         break;
        //     case '1':
        //         priceGt = 100;
        //         priceLte = 500;
        //         break;
        //     case '2':
        //         priceGt = 500;
        //         priceLte = 1000;
        //         break;
        //     case '3':
        //         priceGt = 1000;
        //         priceLte = 5000;
        //         break;
        // }

        // 表驱动法
        let priceItem = [
            [0, 100],
            [100, 500],
            [500, 1000],
            [1000, 5000]
        ];
        param = {
            salePrice: {
                // $gt: priceGt,
                // $lte: priceLte
                $gt: priceItem[priceLevel][0],
                $lte: priceItem[priceLevel][1]
            }
        }
    }

    console.log(param);

    let currentPage = (parseInt(req.param('page')) > 0) ? parseInt(req.param('page')) : 1; //第几页
    let pagesize = (parseInt(req.param('pagesize')) > 0) ? parseInt(req.param('pagesize')) : 8; //每页显示多少条

    let skip = (currentPage - 1) * pagesize;

    // 数据库一共有17条数据 每页显示8条 第二页 从第九条开始 limit 从第9条起数8条为止 这个8就是limit

    let goodModel = Goods.find(param).sort({ 'salePrice': sort }).skip(skip).limit(pagesize);
    goodModel.exec({}, function(err, doc) {
        res.json({ status: 0, result: doc })
    })
})

//加入购物车
router.post('/addCart',function (req,res,next) {
    let productId = req.body.productId;
    let userId = req.cookies.userId;
    User.findOne({_id:userId},function (err,userDoc) {
        let goodItem = '';
        userDoc.cartList.forEach(function (item) {
            if(item.productId == productId){
                goodItem = item
                item.productNum++
            }
        })
        if(goodItem){
                userDoc.save(function (err3,doc3) {
                    if(err3){
                        res.json({status: "1", msg: err3.message})
                    }else{
                        res.json({ status: 0, msg: '', result: '商品数量添加成功！' })
                    }
                })
        }else{
            Goods.findOne({'productId':productId},function (err,goodsDoc) {
                goodsDoc.productNum = 1;
                goodsDoc.checked = true;
                userDoc.cartList.push(goodsDoc);
                userDoc.save(function (err2,doc2) {
                    res.json({
                        status:'0',
                        msg:'',
                        result:'加入购物车成功'
                    })
                })
            })
        }

    })
})
module.exports = router;