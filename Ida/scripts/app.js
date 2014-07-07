// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

// Modular AngularJS App Design http://clintberry.com/2013/modular-angularjs-application-design/
// http://weblogs.asp.net/dwahlin/archive/2013/05/22/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs.aspx
// Filters http://thecodebarbarian.wordpress.com/2014/01/17/the-8020-guide-to-writing-and-using-angularjs-filters/
// Angular JS in one day http://toddmotto.com/ultimate-guide-to-learning-angular-js-in-one-day/
// Filters http://forum.ionicframework.com/t/infinite-scroll-with-nested-array-divider-list/3311/2

// Slide up screen 
// http://codepen.io/calendee/pen/pHmfq
// https://egghead.io/lessons/angularjs-ngrepeat-and-filtering-data
// https://github.com/angular-ui/ui-router/wiki/URL-Routing
//https://developer.foursquare.com/docs/users/leaderboard
// http://rabidgadfly.com/2013/02/angular-intro-to-modules-services-factories-and-filtering/
//angular.module('Dashboard','Playlists','Video','Thermostat', []);
// http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#advanced-queries
//http://flask.pocoo.org/snippets/100/
//http://stackoverflow.com/questions/12190166/angularjs-any-way-for-http-post-to-send-request-parameters-instead-of-json
// Resize footer bar height 
//http://forum.ionicframework.com/t/can-i-resize-footer-bar-height/2533/7
angular.module('Dashboard',[]);
angular.module('Playlists',[]);
angular.module('Video',[]);
angular.module('Thermostat',[]);
angular.module('Remote',[]);

var MainApp = angular.module('MainApp', ['ui.knob', 'emguo.poller','ngResource','rt.debounce', 'ionic','Dashboard','Playlists','Video','Thermostat','Remote']);
MainApp.run(function($ionicPlatform) {
    
  $ionicPlatform.ready(function() {
    $ionicPlatform.fullScreen();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    StatusBar.hide();

  });

});
MainApp.constant("API_URL","http://automation.vi-dev.net")
MainApp.constant("API_PORT", "5001")
MainApp
.factory('greet1', function ($resource,API_URL,API_PORT) {
    return $resource(API_URL+':'+API_PORT+'/music/track',
        {
            name: 'Emma'
        },
        {
            jsonp_get: { method: 'GET' }
        });
})

.factory('LoaderService', function($rootScope, $ionicLoading) {
  return {
        show : function() {

            $rootScope.loading = $ionicLoading.show({

              // The text to display in the loading indicator
              content: '<i class="icon ion-looping"></i> Loading',

              // The animation to use
              animation: 'fade-in',

              // Will a dark overlay or backdrop cover the entire view
              showBackdrop: false,

              // The maximum width of the loading indicator
              // Text will be wrapped if longer than maxWidth
              maxWidth: 200,

              // The delay in showing the indicator
              showDelay: 10
            });
        },

        hide : function(){
            $rootScope.loading.hide();
        }
    }
})

// .factory('Poller', function($http, $timeout,PlaylistsService) {
//   var service = {}
//   var data = {}
//   //var data = { response: {}, calls: 0 };

//   service.pollTest = function() {
//       PlaylistsService.getCurrentInfo().then(function(r){
//         data.response = r
//         //$timeout(service.pollTest, 1000);
//       })
//     // $http.get('http://automation.vi-dev.net/track').then(function(r) {
//     //   data.response = r.data;
//     //   data.calls++;
//     //   $timeout(service.pollTest, 1000);
//     // });
    
//     return data.response
//   }


//   return service;
  
  
// })

// .directive('knob', function($ionicGesture,debounce) {
//     return {
//         require: 'ngModel',
//         scope: { model: '=ngModel' },
//         controller: function($scope, $element, $timeout) {
//             var el = $($element);
//             console.dir($element)

//             $scope.$watch('model', function(v) {
//                 var el = $($element);


//                 //$ionicGesture.on('tap', function(){ console.log('dragend')}, $element);
//                 el.val(v).trigger('change');
//             });
//         },

//         link: function($scope, $element, $attrs,$ngModel) {

//             var el = $($element);
//             var fn = debounce(150, function() {
//               // update the time

//               console.log("HERE2")

//             }) 

//             el.val($scope.value).knob(
//                 {
//                     'change' : function (v) {
                        
//                         $scope.$apply(function () {
//                           fn();
//                           console.log(v)               
//                           $ngModel.$setViewValue(v);
//                     });
//                 }
//                 }
//             );
//         }
//     }

// })
.directive('dragdetect', function($ionicGesture,PlaylistsService) {
  //console.log("DRAG")
  return {
    require: 'ngModel',
   // scope: { model: '=ngModel'},
   scope:true,
    // controller: function($scope, $element, $timeout) {
    //     var el = $($element);

    //     $scope.$watch('model', function(v) {
    //         var el = $($element);
    //         el.val(v).trigger('change');

    //     });
    // },

    // Other directive stuff ...

    link: function($scope, $element, $attr) {
      var handleDrag = function(e) {
        // Access e.gesture for gesture related information
        //console.log('Drag: ', e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.deltaX, e.gesture.deltaY);
       // PlaylistsService.changeVolume($element[0].value)
        console.dir($element[0].value)
        console.log("vals")
        //console.dir($attr)
        $scope.updateFn($element[0].value)
      };

      var handleDrags = function(e) {
        // Access e.gesture for gesture related information
        //console.log('Drag: ', e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.deltaX, e.gesture.deltaY);
       // PlaylistsService.changeVolume($element[0].value)
       console.log('dragging')
       $scope.updateNewFn($element[0].value)
      };


      var dragGesture = $ionicGesture.on('dragend', handleDrag, $element);
      var dragGestures = $ionicGesture.on('drag', handleDrags, $element);

      $scope.$on('$destroy', function() {
        // Unbind drag gesture handler
        $ionicGesture.off(dragGesture, 'drag', handleDrag);
        console.dir("Drag Ended")
      });
    }
  }
})

.directive('detectGestures', function($ionicGesture,PlaylistsService,myService) {
  return {
    //restrict :  'A',
    link : function(scope, elem, attrs) {
      // var gestureData = attrs.listdata;
        var tapGesture = $ionicGesture.on('tap', function(){ 
            //console.log(attrs.itemid, attrs.action, attrs.url)
            if(attrs.action == 'radio_link'){
              
              console.log("disable click: "+ attrs.disableclick)
              if(attrs.disableclick == true || attrs.type == 'audio' ){
                console.log('play now option')
                myService.playNow(attrs.id,attrs.type)
              }
              console.log("radio link")
              console.log(attrs.action, attrs.type, attrs.cmd,attrs.id)
            }else{
              PlaylistsService.playSong(attrs.itemid,attrs.url)
            }

        }, elem);
      var holdGesture = $ionicGesture.on('hold', function(){
            console.log("HELD DOWN")
            myService.addToPlaylist(attrs.url,attrs.itemid) 
      }, elem);
      // switch(gestureType) {
      //   case 'tap':
      //       $ionicGesture.on('tap', function(){
      //           console.log("TAP")
      //       },elem);
      //       break;
       
      //   case 'hold':
      //     $ionicGesture.on('hold', function(){
      //       console.log("HELD")
      //     }, elem);
      //     break;
      // }

    }
  }
});

    