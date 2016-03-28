/*jshint esversion: 6 */

angular.module('vena').directive('newEmployee', function(){
  return {
    restrict: 'E',
    templateUrl: 'client/new-employee/new-employee.html',
    controllerAs: 'newEmployee',
    reload: true,
    controller: function($scope, $reactive, $state, $stateParams, $mdToast, send, auth){
      $reactive(this).attach($scope);

      if(Math.floor((auth.expiresAt() - Date.now()) / 1000) < 1){
        auth.logout();
        $state.go('main');
      }

      this.helpers({
        formVar: () => {
          return DB.findOne({ _id: $stateParams.formId });
        }
      });

      this.form = {};
      if(this.formVar){
        this.form = this.formVar;
      } else if(!this.formvar && $stateParams){
        $state.go('newEmployee');
      }

      this.form.type = 'New Employee';
      this.form.link = 'newEmployee';
      this.selections = ['Required','Not Required'];
      if(!this.form.state)
        this.form.state = 'edit';

      this.save = (section) => {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Saving')
            .position('top right')
            .hideDelay(3000)
        );
        if(section){
          this.form[section] = new Array([auth.name(), new Date()]);
        }
        if(this.form.authors){
          if (this.form.authors.indexOf(auth.name()) < 0) {
            this.form.authors.push(auth.name());
          }
        } else {
          this.form.authors = new Array(auth.name());
        }
        if($stateParams.formId){
          DB.update({ _id: $stateParams.formId }, {
            $set: {
              authors: this.form.authors,
              A: this.form.A,
              B: this.form.B,
              C: this.form.C,
              D1: this.form.D1,
              D2: this.form.D2,
              D3: this.form.D3,
              data: this.form.data,
              state: this.form.state
            }
          });
        } else {
          DB.insert(this.form, function(err,id){
            if(err){
              console.error(err);
            }
            $mdToast.show(
              $mdToast.simple()
                .textContent('Sending Emails')
                .position('top right')
                .hideDelay(3000)
            );
            send('New Employee', '/new-employee/', id, function(err){
              if(err){
                auth.login(function(){
                  send('New Employee', '/new-employee/', id, function(err){
                    if(err){
                      console.error(err);
                    }
                  });
                });
              }
            });
            $state.go('newEmployee', {formId: id});
          });
        }
      };

      this.fix = (inp) => {
        if(inp){
          var string = inp[inp.length-1];
          string = string[0] + ' - ' + string[1].toDateString() + ' ' + string[1].toLocaleTimeString();
          return string;
        } else {
          return;
        }
      };

      this.listify = (inp) => {
        if(inp){
          var string = inp[0];
          for(var i = 1; i < inp.length; i++){
            string += ', ' + inp[i];
          }
          return string;
        }
        return;
      };

      this.submit = () => {
        if(this.form.A && this.form.B && this.form.C && this.form.D1 && this.form.D2 && this.form.D3){
          this.form.state = 'complete';
          this.save();
        }
      };

      this.delete = () => {
        DB.remove({ _id: $stateParams.formId }, function(err){
          if(err)
            console.error(err);
        });
        $state.go('main');
      };
    }
  };
});
