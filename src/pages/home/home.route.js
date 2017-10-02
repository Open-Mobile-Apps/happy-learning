(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tab.home', {
          url: '/home',
          views: {
            'tab-home': {
              templateUrl:'pages/home/home.html',
              controller: 'HomeCtrl'
            }
          }
        })
    });
})(angular);
