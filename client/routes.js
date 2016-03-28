/*jshint esversion: 6 */

angular.module('vena').config(function(
  $urlRouterProvider,
  $stateProvider,
  $locationProvider,
  $mdThemingProvider
){
  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('teal');

  $stateProvider
    .state('main', {
      url: '/',
      template: '<main></main>'
    })
    .state('newEmployee', {
      url: '/new-employee/:formId',
      template: '<new-employee></new-employee>',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() === null){
            return $q.reject();
          } else {
            return $q.resolve();
          }
        }
      }
    })
    .state('positionChange', {
      url: '/position-change/:formId',
      template: '<position-change></position-change>',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() === null){
            return $q.reject();
          } else {
            return $q.resolve();
          }
        }
      }
    })
    .state('termination', {
      url: '/termination/:formId',
      template: '<termination></termination>',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() === null){
            return $q.reject();
          } else {
            return $q.resolve();
          }
        }
      }
    })
    .state('resignation', {
      url: '/resignation/:formId',
      template: '<resignation></resignation>',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() === null){
            return $q.reject();
          } else {
            return $q.resolve();
          }
        }
      }
    });
});

angular.module("vena").run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (
    event,
    toState,
    toParams,
    fromState,
    fromParams,
    error){
    if (error === 'AUTH_REQUIRED') {
      $state.go('main');
    }
  });
});
