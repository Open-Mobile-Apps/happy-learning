(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tabs.my', {
          url: '/my',
          views: {
            'tabs-my': {
              templateUrl: 'pages/my/my.view.html',
              controller: 'myCtrl'
            }
          }
        })
    });
})(angular);
