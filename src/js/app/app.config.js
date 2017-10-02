(function (angular) {
  "use strict";
  // 配置模块，控制不同平台的兼容性
  angular.module('happyLearning')
    .config(function ($urlRouterProvider, $httpProvider, $ionicConfigProvider) {
      // $urlRouterProvider.otherwise('/tabs/home'); // 默认路由
      ionic.Platform.isFullScreen = false; // 禁止全屏显示

      $ionicConfigProvider.views.transition('platform');
      $ionicConfigProvider.views.swipeBackEnabled(ionic.Platform.isIOS());
      $ionicConfigProvider.spinner.icon('ios');

      // 通用样式的兼容
      $ionicConfigProvider.platform.android.tabs.position("bottom");
      $ionicConfigProvider.platform.ios.tabs.position("bottom");
      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');
      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');
      $ionicConfigProvider.tabs.style('standard');

      $ionicConfigProvider.scrolling.jsScrolling(!ionic.Platform.isAndroid()); // false 默认所有的滚动使用native，会比js的滚动快很多，并且很平滑 ; 安卓使用,ios不使用
    })
    .config(function ($ionicNativeTransitionsProvider) {
      var transOption = {
        duration: 300,
        slowdownfactor: 10,
        androiddelay: -1,
        fixedPixelsTop: 0,
        fixedPixelsBottom: 0,
        backInOppositeDirection: false
      };

      var defaultTrans = {
        type: 'slide',
        direction: 'left'
      };

      var backTrans = {
        type: 'slide',
        direction: 'right'
      };

      function setAndroidTrans(){
        $ionicNativeTransitionsProvider.setDefaultOptions(transOption);
        $ionicNativeTransitionsProvider.setDefaultTransition(defaultTrans);
        $ionicNativeTransitionsProvider.setDefaultBackTransition(backTrans);
        $ionicNativeTransitionsProvider.enable(true); // Enable plugin and disable ionic transitions
      }

      ionic.Platform.isAndroid() ? setAndroidTrans() : $ionicNativeTransitionsProvider.enable(false);
    })
})(angular);

