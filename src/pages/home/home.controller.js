(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .controller('homeCtrl', [
      '$scope',
      '$ionicSlideBoxDelegate',
      '$timeout',
      '$http',
      function ($scope, $ionicSlideBoxDelegate, $timeout, $http) {
        /* 初始化数据成员 */
        var fn = $scope.fn = {};
        var viewData = $scope.viewData = {}; // 视图数据绑定

        // 进入视图前
        $scope.$on('$ionicView.beforeEnter', function () {
        });

        pageInit();

        /* 初始化页面设置 */
        function pageInit() {
          getCarousel(); // 获取轮播数据
          getCategory(); // 获取滚动分类数据
        }

        // 首页轮播
        function getCarousel() {
          $http.get("./data/home.topSlider.json")
            .success(function (data) {
              viewData.topSlider = data;
            })
            .error(function (e) {
              console.log(e);
            })
            .finally(function () {
              // 更新轮播控件
              var timer = $timeout(function () {
                $ionicSlideBoxDelegate.$getByHandle('home-top-slider').update();
                $ionicSlideBoxDelegate.$getByHandle('home-top-slider').loop(true); // 解决网络加载时候的bug
                $timeout.cancel(timer); // 移除定时器
              });
            });
        }

        // 轮播下的课程类别
        function getCategory() {
          $http.get("./data/home.scrollCate.json")
            .success(function (data) {
              viewData.scrollCate = data;
            })
            .error(function (e) {
              console.log(e);
            });
        }

        // 每次滑动到当前模块,执行一个动画
        fn.slideHasChanged = function (index) {
          // todo
          console.log(index);
        };

      }]);
})(angular);
