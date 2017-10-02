(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'pages/tab/tab.html',
          controller: 'tabCtrl'
        })
    });
})(angular);
