(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tabs.home', {
          url: '/home',
          views: {
            'tabs-home': {
              templateUrl: 'pages/home/home.view.html',
              controller: 'homeCtrl'
            }
          }
        })
    });
})(angular);
