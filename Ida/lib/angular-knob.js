angular.module('ui.knob', [])
  .directive('knob', function () {
    return {
      restrict: 'E',
      template: function(elem, attrs){
        return '<input value="{{ knob }}">';
      },
      require: 'ngModel',
      replace: true,
      scope: true,
      //scope: { model: '=ngModel' },
      controller: function($scope, $element, $timeout) {
                var el = $($element);
                $scope.$watch('someObj.data', function(v) {
                    var el = $($element);
      
                    el.val(v).trigger('change');
                });
      },      
      link: function (scope, elem, attrs,$ngModel) {

        scope.knob = scope.$eval(attrs.knobData);
        console.log('knob data')
          console.log(scope.knob)
        console.log( scope.$eval(attrs.knobRelease) );

        var renderKnob = function(){

          scope.knob = scope.$eval(attrs.knobData);

          var opts = {}; 
          if(!angular.isUndefined(attrs.knobOptions)){
            opts = scope.$eval(attrs.knobOptions);
          }

          if(!angular.isUndefined(attrs.knobMax)){
            var max = scope.$eval(attrs.knobMax);
            if(!angular.isUndefined(max)){

              opts.max = max;
            
            }
          }

          //  $elem = $(elem);
          // $elem.val(scope.knob);
          // $elem.change();
          // $elem.knob(opts);

          
          $elem = $(elem);
          $elem.val(scope.knob).knob({
            'change' : function (v) {
              scope.$apply(function () {
                $ngModel.$setViewValue(v);
             scope.updateNewFn(v)
                
              });
            //$ngModel.$setViewValue(v);
            },
            'release': function(v){
             // console.log('released')
             scope.updateFn(v)
            }

          });

         
          $(elem).trigger('configure',opts)
          $elem.change();
          $elem.knob(opts);


        };

        scope.$watch(attrs.knobData, function () {

           renderKnob();
        });
        
        scope.$watch(attrs.knobOptions, function () {
          renderKnob();
        }, true);

      }
    };
  });