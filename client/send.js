/*jshint esversion: 6 */

angular.module('vena').factory('send', function(emails, auth, link){
    var send = (type,parent,id,callback) => {
      var message = `To: `+ emails.toString() + `
From: Vena On/Off-boarding <`+ auth.email() +`>
Subject: `+ type +` Form
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

Please go to <a href=3D"`+ link + parent + id + `">this link</a>`;

    var encodedMail = btoa(message).replace(/\+/g, "-").replace(/\//g, "_");

    HTTP.post('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
        'headers' : {
            'Authorization': "Bearer " + auth.token(),
            'Content-Type': 'application/json'
        },
        'content': JSON.stringify({
            "raw": encodedMail
        })
      }, function(err){
        if(err){
          if(Math.floor((auth.expiresAt() - Date.now()) / 1000) < 1){
            callback(auth.expiresAt());
          } else {
            console.error(err);
          }
        }
      });
      callback();
    };
  return send;
});
