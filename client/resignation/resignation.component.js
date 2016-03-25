angular.module('vena').directive('resignation', function(){
  return {
    restrict: 'E',
    templateUrl: 'client/resignation/resignation.html',
    controllerAs: 'resignation',
    reload: true,
    controller: function($scope, $reactive, $state, $stateParams, emails, link){
      $reactive(this).attach($scope);

      this.helpers({
        formVar: () => {
          return DB.findOne({ _id: $stateParams.formId });
        }
      });
      this.form = {};
      if(this.formVar){
        this.form = this.formVar;
      } else if(!this.formvar && $stateParams){
        $state.go('resignation');
      };
      this.form.type = 'Resignation';
      this.form.link = 'resignation';
      if(!this.form.state)
        this.form.state = 'edit';
      this.save = (section) => {
        if(section){
          this.form[section] = new Array([Meteor.user().profile.name, new Date()]);
        };
        if(this.form.authors){
          if (this.form.authors.indexOf(Meteor.user().profile.name) < 0) {
            this.form.authors.push(Meteor.user().profile.name);
          }
        } else {
          this.form.authors = new Array(Meteor.user().profile.name);
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
            var message = `To: `+ emails.toString() + `
From: Vena On/Off-boarding <`+ Meteor.user().services.google.email +`>
Subject: Resignation Form
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable


Please go to <a href=3D"`+ link + `/resignation/` + id + `">this link</a>`;
            var encodedMail= CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(message)).replace(/\+/g, "-").replace(/\//g, "_");
            Meteor.http.post('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
                'headers' : {
                    'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
                    'Content-Type': 'application/json'
                },
                'content': JSON.stringify({
                    "raw": encodedMail
                })
              }, function(err){
                if(err){
                  console.error('err');
                }
              });
            $state.go('resignation',{formId: id});
            if(err)
              console.error(err);
          });
        }
      };
      this.fix = (inp) => {
        if(inp){
          var string = inp[inp.length-1];
          string = string[0] + ' - ' + string[1].toDateString() + ' ' + string[1].toLocaleTimeString();
          return string
        } else {
          return
        }
      };
      this.listify = (inp) => {
        if(inp){
          var string = inp[0];
          for(var i = 1; i < inp.length; i++){
            string += ', ' + inp[i];
          }
          return string
        }
        return
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
      this.selections = ['Yes','No','Not Applicable'];
      this.selections2 = ['Yes','No'];
    }
  }
});
