(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .controller('tabsCtrl', [
      '$scope',
      'appUtils',
      function ($scope, appUtils) {
        // 初始化数据成员
        var fn = $scope.fn = {}; // 使用命名空间定义一种编程的方式
        fn.switch = function (url) {
          appUtils.doGo(url, appUtils.clearHistory); // 每次进入tab中的一个就清除历史记录
        }
      }]);
})(angular);
