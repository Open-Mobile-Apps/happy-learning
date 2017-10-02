(function (angular) {
  'use strict';
  angular.module('happyLearning', [
    'ionic',
    'ngCordova',
    'ionic-native-transitions',
    'templates'
  ])
    .run(function ($ionicPlatform, appUtils) {
      $ionicPlatform.ready(function () {
        appUtils.doGo("tab/home"); // ready时跳转到首页
      });
    });
})(angular);
