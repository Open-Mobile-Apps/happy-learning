(function (angular) {
  'use strict';
  angular.module('happyLearning', [
    'ionic',
    'ngCordova',
    'ionic-native-transitions'
  ])
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {

      });
    });
})(angular);
