/*jshint esversion: 6 */

angular.module('vena').factory('auth', function(){

  var auth = {};

  auth.login = (callback) => {
    Meteor.loginWithGoogle({
      requestPermissions: [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.send']
    },function(err){
      if(err)
        console.error(err);
      callback();
    });
  };

  auth.logout = () => {
    Meteor.logout(function(err){
      if(err)
        console.error(err);
    });
  };

  auth.isLoggedIn = () => {
    if(Meteor.user())
      return true;
    return false;
  };

  auth.token = () => {
    try{
      return Meteor.user().services.google.accessToken;
    } catch(err) {
      console.error(err);
      return;
    }
  };

  auth.email = () => {
    try{
      return Meteor.user().services.google.email;
    } catch(err) {
      console.error(err);
      return;
    }
  };

  auth.expiresAt = () => {
    try{
      return Meteor.user().services.google.expiresAt;
    } catch(err) {
      console.error(err);
      return;
    }
  };

  auth.name = () => {
    try{
      return Meteor.user().profile.name;
    } catch(err) {
      console.error(err);
      return;
    }
  };

  return auth;
});
