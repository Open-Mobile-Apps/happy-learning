(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tabs.discover', {
          url: '/discover',
          views: {
            'tabs-discover': {
              templateUrl: 'pages/discover/discover.view.html',
              controller: 'discoverCtrl'
            }
          }
        })
    });
})(angular);
