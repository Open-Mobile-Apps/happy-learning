(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tabs', {
          url: '/tabs',
          abstract: true,
          templateUrl: 'pages/tabs/tabs.view.html',
          controller: 'tabsCtrl'
        })
    });
})(angular);
