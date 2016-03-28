/*jshint esversion: 6 */

angular.module('vena').directive('main', function(){
  return {
    restrict: 'E',
    templateUrl: 'client/main/main.html',
    controllerAs: 'main',
    controller: function($scope, $reactive, auth){
      $reactive(this).attach($scope);

      if(Math.floor((auth.expiresAt - Date.now()) / 1000) < 1){
        auth.logout();
      }

      this.selections = ['New Employee','Position Change','Termination','Resignation'];
      this.filter = {};
      this.filter.type = '';

      this.login = auth.login;
      this.logout = auth.logout;
      this.isLoggedIn = auth.isLoggedIn;

      this.helpers({
        forms: () => {
          return DB.find({});
        }
      });

      this.one = (inp) => {
        if(inp > 1)
          return false;
        else {
          return true;
        }
      };

      this.listify = (inp) => {
        var string = inp[0];
        for(var i = 1; i < inp.length; i++){
          string += ', ' + inp[i];
        }
        return string;
      };
    }
  };
});
