(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .config(function ($stateProvider) {
      $stateProvider
        .state('tabs.category', {
          url: '/category',
          views: {
            'tabs-category': {
              templateUrl: 'pages/category/category.view.html',
              controller: 'categoryCtrl'
            }
          }
        })
    });
})(angular);
