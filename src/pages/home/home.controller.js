(function (angular) {
  'use strict';
  console.log(3);
  angular.module('happyLearning')
    .controller('homeCtrl', [
      '$scope',
      function ($scope) {
        // 初始化数据成员
        console.log("home");
      }]);
})(angular);
