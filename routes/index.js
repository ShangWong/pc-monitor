'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var TextMessage = require('leancloud-realtime').TextMessage;

var conversation = AV.Object.createWithoutData('_Conversation', '5a8298181579a300383e1ce1');

// 查询 Todo 列表
var Client = AV.Object.extend('Client');
router.get('/', function(req, res, next) {
  var query = new AV.Query(Client);
  query.ascending('position');
  query.find().then(function(results) {
    res.render('index', {
      title: '客户端PC列表',
      clients: results      
    });
  }, function(err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      res.render('index', {
        title: 'TODO 列表',
        clients: []
      });
    } else {
      next(err);
    }
  }).catch(next);
});

// 锁定特定Client
router.post('/lock/:id', function(req, res, next) {
  var id = req.params.id;
  var client = AV.Object.createWithoutData('Client', id);
  
  client.fetch().then(function (){
    var message = new TextMessage('手慢了！ [' + client.get('PC') + '] 都被人抢走了!');  
    conversation.send('隔壁通知', message, { toClients: [] }, { useMasterKey: true }).then(function() {
      console.log('sended: ' + message);
    }, function(error) {
      console.error('send message error: ' + error.message);      
    });
  });
  client.set('available', false);
  


  client.save();  
  res.sendStatus(200);
});

// 解锁特定Client
router.post('/release/:id', function(req, res, next) {
  var id = req.params.id;
  var client = AV.Object.createWithoutData('Client', id);
  
  client.fetch().then(function (){
    var message = new TextMessage('[' + client.get('PC') + '] 免费给你用，机不再来!');  
    conversation.send('隔壁通知', message, { toClients: [] }, { useMasterKey: true }).then(function() {
      console.log('sended: ' + JSON.stringify(message));
    }, function(error) {
      console.error('send message error: ' + error.message);      
    });
  });
  client.set('available', true);
  
  client.save();
  res.sendStatus(200);  
});

module.exports = router;
