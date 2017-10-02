(function (angular) {
  'use strict';
  angular.module('happyLearning', [
    'ionic',
    'ngCordova',
    'ionic-native-transitions',
    'templates'
  ])
    .run(function ($ionicPlatform, $state) {
      $ionicPlatform.ready(function () {
        console.log("ready");
        function go (route, params) {
          $state.go(route, params);
        }
        go("tab.home");

      });
    });
})(angular);
