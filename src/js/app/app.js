(function (angular) {
  'use strict';
  angular.module('happyLearning', [
    'ionic',
    'ionic-native-transitions'
  ])
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        console.log(1);
      });
    });
})(angular);
