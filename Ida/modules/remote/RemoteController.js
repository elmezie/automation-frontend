// app/modules/patient/controllers.js
//.controller('AppCtrl', ['$scope','$http','$location', function($scope,$http,$location) {

angular.module('Remote',[]).controller('RemoteCtrl', function($scope,$stateParams,$ionicActionSheet) {
    $scope.slider = {};
    $scope.slider.rangeValue = 0;
    $scope.text = 22;
    $scope.number = 24;

    $scope.dialval2 = 44

    $scope.showOperatingMode = function(){
         $ionicActionSheet.show({
             buttons: [
               { text: 'OFF' }
               ,{ text: 'HEAT' }
               ,{ text: 'COOL' }
               ,{ text: 'AUTO' }
             ],
             //destructiveText: 'Delete',
             titleText: 'Operating Mode',
             cancelText: 'Cancel',
             buttonClicked: function(index) {
                //console.dir(index)
                return true;
             }
           });        
    }

    $scope.showFanMode = function(){
        $ionicActionSheet.show({
            buttons: [
                { text : 'AUTO' }
                ,{ text : 'ON' }
            ],
            titleText : 'Fan Mode',
            cancelText : 'Cancel',
            buttonClicked: function(index){
                return true;
            }
        });
    }

    $scope.showHoldMode = function(){
        $ionicActionSheet.show({
            buttons: [
                { text : 'Disabled' }
                ,{ text : 'Enabled' }
            ],
            cancelText : 'Cancel',
            titleText : 'Hold Status',
            buttonClicked: function(index){
                return true;
            }
        })
    }

})

// .directive('knob', function() {
//     return {
//         require: 'ngModel',
//         scope: { model: '=ngModel' },
//         controller: function($scope, $element, $timeout) {
//             var el = $($element);

//             $scope.$watch('model', function(v) {
//                 var el = $($element);
//                 el.val(v).trigger('change');
//             });
//         },

//         link: function($scope, $element, $attrs,$ngModel) {
//             var el = $($element);
//             el.val($scope.value).knob(
//                 {
//                     'change' : function (v) {
//                         $scope.$apply(function () {
//                           $ngModel.$setViewValue(v);
//                     });
//                 }
//                 }
//             );
//         }
//     }

// })
