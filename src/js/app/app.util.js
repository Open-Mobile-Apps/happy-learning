(function (angular) {
  'use strict';
  angular.module('happyLearning')
    .factory('appUtils', [
      '$state',
      '$timeout',
      '$ionicViewSwitcher',
      '$ionicNativeTransitions',
      '$ionicHistory',
      '$ionicModal',
      '$cordovaToast',
      function ($state, $timeout, $ionicViewSwitcher, $ionicNativeTransitions, $ionicHistory, $ionicModal, $cordovaToast) {
        var Util = function () {
        };

        Util.prototype = {
          /* 通用返回函数 */
          back: function () {
            // 不同平台分别处理
            $ionicViewSwitcher.nextDirection('back');
            ionic.Platform.isIOS() ? $ionicHistory.goBack() : $ionicNativeTransitions.goBack();
          },

          /* 进入某个路由模块 */
          go: function (route, params, callback) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go(route, params);
            callback && callback();
          },

          /* 直接进入模块(无动画) */
          directTo: function (route, params, callback) {
            callback && callback(); // 执行回调
            var args = params || {};
            if (ionic.Platform.isIOS()) {
              $ionicViewSwitcher.nextDirection('enter');
              return $state.go(route, args);
            }
            $ionicNativeTransitions.stateGo(route, args, {
              "type": "fade",
              "duration": 0
            });
          },

          /* 解决双平台刷新问题的直接进入 tab栏用 */
          doGo: function (url, callback) {
            $ionicNativeTransitions.locationUrl(url, {
              "type": "fade",
              "duration": 0
            });
            // 使用异步延时来处理回调
            var timer = $timeout(function () {
              timer = null; // 释放内存
              callback && callback();
            });
          },

          /* 字符串 trim 函数 */
          trim: function (str) {
            if (typeof str === 'string') {
              return str.replace(/^\s+|\s+$/g, "");
            }
          },

          // 隐藏闪屏
          enterSettings: function () {
            navigator.splashscreen && navigator.splashscreen.hide(); // 设置闪屏
            window.StatusBar && window.StatusBar.show(); // 显示状态栏
          },

          /* 用户提示功能 */
          tips: function (prompt, index) {
            // 位置信息 0 上 , 1 中 , 2 下
            switch (index) {
              case 0:
                return window.cordova ? $cordovaToast.showShortTop(prompt) : alert(prompt);
                break;
              case 1:
                return window.cordova ? $cordovaToast.showShortCenter(prompt) : alert(prompt);
                break;
              case 2:
                return window.cordova ? $cordovaToast.showShortBottom(prompt) : alert(prompt);
                break;
            }
          },

          /* 隐藏 modal */
          hideModal: function (modal) {
            modal.hide();
          },

          /* 移除 modal */
          destroyModal: function (scope, modal) {
            scope.$on('$destroy', function () {
              // 如果是单个，则直接移出，如果是数组，则迭代移除
              if (Array.isArray(modal)) {
                modal.forEach(function (item) {
                  item.remove();
                })
              } else {
                modal && modal.remove();
              }
            });
          },

          /* 清除历史记录功能 */
          clearHistory: function () {
            $ionicHistory.clearHistory();
          },

          // 清除cache
          clearCache: function () {
            $ionicHistory.clearCache();
          },

          /* 数组去重功能 */
          arrayUnique: function (arr) {
            if (!Array.isArray(arr)) return;
            var res = [];
            var json = {};
            for (var i = 0; i < arr.length; i++) {
              if (!json[arr[i]]) {
                res.push(arr[i]);
                json[arr[i]] = 1;
              }
            }
            return res;
          }
        };

        return new Util();
      }]);
})(angular);
