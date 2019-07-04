var express = require('express');
var router = express.Router();
var User = require('../models/user');
require('../util/util')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录接口
router.post('/login',function (req,res,next) {
  let param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  User.findOne(param,function (err,doc) {
    if(err){
      res.json({"status":1,msg:"用户名密码错误"})
    }else{
      res.cookie('userId',doc._id,{
        path:'/',
        maxAge:1000 * 60 * 60
      })
      res.cookie('userName',doc.userName,{
        path:'/',
        maxAge:1000 * 60 * 60
      })
      if(doc){
        res.json({
          status:0,
          msg:'',
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
})
//检查登录接口
router.post('/checkLogin',function (req,res,next) {
  //使用cookies读取cookie
  if(req.cookies.userId){
    res.json({
      status:'0',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:1,
      msg:'未登录',
      result:''
    })
  }
})
//退出接口
router.post('/logout', function(req, res, next) {
  res.cookie('userId', "", {
    path: '/',
    maxAge: -1
  });
  res.cookie('userName', "", {
    path: '/',
    maxAge: -1
  });

  res.json({
    status: 0,
    msg: '',
    result: "退出成功"
  })
})
//遍历列表接口
router.post('/cartList',function (req,res,next) {
  let userId = req.cookies.userId;
  User.findOne({_id:userId},function (err,doc) {
    if(err){
      res.json({status:'1',msg:err.message,result:''})
    }else{
      res.json({status:'0',msg:'',result:doc.cartList})
    }
  })
})
//添加商品
router.post('/cartEdit',function (req,res,next) {
  let userId = req.cookies.userId,
      productId = req.body.productId,
      checked = req.body.checked,
      productNum = req.body.productNum;
  User.update({'_id':userId,'cartList.productId':productId},{
    'cartList.$.productNum':productNum,
    'cartList.$.checked': checked==true?true:''
  },function (err,doc) {
    if(err){
      res.json({status:'1',msg:err.message,result:''})
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'修改购物车商品成功'
      })
    }
  })
})
//全选
router.post('/editCheckAll', function(req, res, next) {
  let userId = req.cookies.userId,
      checkAll = req.body.checkAll;
  User.findOne({ '_id': userId }, function(err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      user.cartList.forEach(item => {
        item.checked = checkAll==true?true:'';
      })

      user.save(function(err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({ status: '0', msg: '', result: '操作成功' })
        }
      })
    }
  })
})
//删除商品
router.post('/cartDel',function (req,res,next) {
  var userId = req.cookies.userId,
      productId = req.body.productId;
  User.update({
    _id:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({status:1,msg:err.message,result:''})
    }else{
      res.json({status:0,msg:'',result:'商品删除成功'})
    }
  })
})
//查询地址
router.get('/addressList',function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({ _id: userId }, function(err, doc) {
    if (err) {
      res.json({ status: 1, msg: err.message, result: '' })
    } else {
      res.json({ status: 0, msg: '', result: doc.addressList })
    }
  })
})
//添加信息
router.post('/addnewress',function (req,res,next) {
  let newress = req.body.newress
  let userId = req.cookies.userId
  newress.isDefault = false
  User.findOne({_id:userId},function (err,userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
        userDoc.addressList.push(newress)
        userDoc.save(function (err1,doc2) {
            if (err) {
              res.json({
                status: '1',
                msg: err1.message,
                result: ''
              })
            }else{
              res.json({
                status: '0',
                msg: '',
                result: ''
              })
            }
          })
    }
  })
})
//删除地址
router.post('/delress',function (req,res,next) {
  var _id = req.body._id ,
      userId = req.cookies.userId;
    User.update({
        _id:userId
    },{
        $pull:{
            addressList:{
                '_id':_id
            }
        }
    },function (err,doc) {
        if(err){
            res.json({status:1,msg:err.message,result:''})
        }else{
            res.json({status:0,msg:'',result:'地址删除成功'})
        }
    })
})
router.post('/setDefault',function (req,res,next) {
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1',
      msg:'地址为空'
    })
  }else{
    User.findOne({_id:userId},function (err,doc) {
      var addressList = doc.addressList;
      addressList.forEach(item=> {
        if(item._id == addressId){
          item.isDefault = true;
        }else{
          item.isDefault = false;
        }
      })
      doc.save(function (err1,doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: doc1.addressList
          })
        }
      })
    })
  }
})
router.post('/addorder',function (req,res,next) {
  let userId = req.cookies.userId;
  User.findOne({ _id: userId }, function(err, doc) {
    if (err) {
      res.json({ status: 1, msg: err.message, result: '' })
    } else {
      res.json({ status: 0, msg: '', result: doc.cartList})
    }
  })
})
router.post("/payMent", function(req, res, next) {
  let userId = req.cookies.userId,
      addressId = req.body.addressId,
      orderTotal = req.body.orderTotal;
  User.findOne({},function (err,doc) {
    if(err){
      res.json({status:'1',msg:err.message,result:''})
    }else{
      var address = "",
          goodsList = [];
      doc.addressList.forEach(item => {
        if(item._id == addressId){
          address = item
        }
      })

      doc.cartList.filter(item => {
        if(item.checked){
          goodsList.push(item);
        }
      })

      //订单号
      var platform = '622';
      var r1 = Math.floor(Math.random() * 10);
      var r2 = Math.floor(Math.random() * 10);
      var sysDate = new Date().Format('yyyy-MM-dd hh:mm:ss');

      var orderId = platform + r1 + sysDate + r2;
      var createData = new Date().Format('yyyy-MM-dd hh:mm:ss');
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '10',
        createData: createData
      }
      doc.orderList.push(order);
      doc.save(function(err1, doc1) {
        if (err1) {
          res.json({ 'status': "1", msg: err.message, result: '' })
        } else {
          res.json({ 'status': "0", msg: '', result: { orderId: order.orderId, orderTotal: orderTotal } })
        }
      })
    }
  })
})
router.post("/orderDetail", function(req, res, next) {
  let userId = req.cookies.userId,
      orderId = req.body.orderId,
      orderTotal = '';
  User.findOne({ _id: userId }, function(err, userInfo) {
    if (err) {
      res.json({ 'status': "1", msg: err.message, result: '' })
    } else {
      if (userInfo.orderList.length <= 0) {

        // if (orderTotal) {
        //   res.json({
        //     status: '0',
        //     msg: '',
        //     result: {
        //       orderId: orderId,
        //       orderTotal: orderTotal
        //     }
        //   })
        //   console.log(orderTotal)
        // }
        res.json({ status: '1010', msg: "当前用户未创建订单", result: '' })
      } else {
        userInfo.orderList.forEach(item => {
          if (item.orderId == orderId) {
            orderTotal = item.orderTotal;
            res.json({
              status: '0',
              msg: '',
              result: {
                orderId: orderId,
                orderTotal: orderTotal
              }
            })
          }
        })

      }
      }

  })
})
module.exports = router;
