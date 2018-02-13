var appId = 'kgnMpF0n7B1YPN5WRe3j5gzp-gzGzoHsz';
var appKey = 'JqvDS55mF6G1gK0JelJlvNE6';

AV.initialize(appId, appKey);

// 请换成你自己的一个房间的 conversation id（这是服务器端生成的）
var roomId = '5a8298181579a300383e1ce1';
// 每个客户端自定义的 id
var clientId = 'Guest';

login();

function login(){
    realtime = new AV.Realtime({
        appId: appId,
        appKey: appKey,
    });

    return realtime.createIMClient(clientId).then(function(guest) {        
        return guest.getConversation(roomId);
      }).then(function(conversation) {
          if (conversation) {
              return conversation;
          }
      }).then(function(conversation){
          return conversation.join();
      }).then(function(conversation){
          conversation.on('message', function(message){
            if(window.Notification && Notification.permission !== "denied") {
                Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
                    var n = new Notification(message.from, { 
                        body: message.content._lctext,
                        // icon: '/path/to/icon.png' // optional
                    }); 
                });
            }
          });
      }).catch(function(err) {
          console.log(err);
      });
          
}