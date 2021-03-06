// app/modules/patient/controllers.js
//.controller('AppCtrl', ['$scope','$http','$location', function($scope,$http,$location) {

angular.module('Thermostat',[]).controller('ThermostatCtrl', function($scope,$window,$stateParams,$ionicActionSheet,ThermostatService) {
    $scope.slider = {};
    $scope.slider.rangeValue = 0;
    $scope.text = 22;
    $scope.number = 24;

    $scope.dialval2 = 44

    $scope.loadValues = function(){
		ThermostatService.getThermostat().then(function(data){
            console.dir(data.data.objects[0])
        	$scope.someObj = data.data.objects[0] 
            console.log($scope.someObj.temp)
        });
        
    	$scope.max = 100;
	    $scope.knobOptions = {
          'width':150,
          'displayInput': true,
          'height':150,
          'skin':'tron',
          'fgColor':'#f0b840',
          'thickness':'.2',
          'bgColor':'none',
          'readOnly':true,
          'step':'.5'
    	};     

    }

    //socket.on('my response', function (data) {
    //	console.log(data)
	//});
    
    $scope.reloadPage = function(){
        $window.location.reload()
    }

    $scope.updateNewFn = function(msg){
        
        console.log("Scope Stopped")
        //console.log($scope.stopped)
        // if(!$scope.stopped){
        //     $scope.poller1.stop()   
        //     $scope.stopped = true;  
        //     console.log("Stopped here") 
        // }
        //$scope.fn(msg)
        //$scope.poller1.stop()
    }

    $scope.updateFn = function(msg){
        // Update the new time
        
        // console.log("HERE")        
        // console.log(msg)
        // $scope.stopped = false;
        // PlaylistsService.seek_to(msg).then(function(data){
        //     $scope.poller1.start()
        // })
        console.log("released")        
        //$scope.fn(msg)
        //$scope.poller1.start()
        //$scope.stopped = false;   
    }
        
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
