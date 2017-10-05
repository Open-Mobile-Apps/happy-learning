(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .controller('homeCtrl', [
      '$scope',
      '$ionicSlideBoxDelegate',
      '$timeout',
      function ($scope, $ionicSlideBoxDelegate, $timeout) {
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
          // 模拟的假数据 mock fake data
          viewData.topSlider = [
            {courseId: 0, cover: "./images/temp/home-carousel-0.jpg"},
            {courseId: 1, cover: "./images/temp/home-carousel-1.jpg"},
            {courseId: 2, cover: "./images/temp/home-carousel-2.jpg"},
            {courseId: 3, cover: "./images/temp/home-carousel-3.jpg"}
          ];
          var timer = $timeout(function () {
            $ionicSlideBoxDelegate.$getByHandle('home-top-slider').update();
            $ionicSlideBoxDelegate.$getByHandle('home-top-slider').loop(true); // 解决网络加载时候的bug
            $timeout.cancel(timer); // 移除定时器
          });
        }

        // 轮播下的课程类别 mock fake data
        function getCategory() {
          viewData.scrollCate = [
            {name: "互联网产品", code: "00001"},
            {name: "编程语言", code: "00002"},
            {name: "移动开发", code: "00003"},
            {name: "软件测试", code: "00004"},
            {name: "云计算", code: "00005"},
            {name: "大数据", code: "00006"},
            {name: "游戏开发", code: "00007"},
            {name: "IT认证", code: "00008"},
            {name: "网络营销", code: "00009"},
            {name: "兴趣生活", code: "00010"}
          ];
        }

        // 每次滑动到当前模块,执行一个动画
        fn.slideHasChanged = function (index) {
          // todo
          console.log(index)
        };

      }]);
})(angular);
