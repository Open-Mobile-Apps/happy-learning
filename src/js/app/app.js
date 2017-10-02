(function (angular) {
  'use strict';
  angular.module('happyLearning', [
    'ionic',
    'ngCordova',
    'ionic-native-transitions',
    'templates'
  ])
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        console.log(1);
      });
    });
})(angular);
