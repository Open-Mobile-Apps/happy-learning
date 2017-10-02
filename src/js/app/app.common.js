(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .factory('appCommon', [
      function () {
        return function () {
          // 设置启动页
          navigator.splashscreen && navigator.splashscreen();
          // 设置键盘
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
          }
          // 设置状态栏
          if (window.StatusBar) {
            StatusBar.styleDefault();
            StatusBar.overlaysWebView(ionic.Platform.isIOS()); // IOS overlay , Android not
          }
        };
      }
    ]);
})(angular);
