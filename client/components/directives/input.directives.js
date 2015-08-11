angular.module('abacashApp')
  .directive('onFocussed', function () {
return ({
        restrict: 'A',
        link: function(scope, element) {
            element.focus(function () {
                element.parent().parent().addClass('focussed');
            });
            element.blur(function () {
                element.parent().parent().removeClass('focussed');
            });
        },
    });
})

    .directive('onTagsFocussed', function () {
return ({
        restrict: 'A',
        link: function(scope, element) {
            element.focus(function () {
                element.parent().parent().addClass('focussed');
                element.addClass('focussed');
                element.parent().parent().addClass('focused');
                element.addClass('focused');
            });
            element.blur(function () {
                element.parent().parent().removeClass('focussed');
                element.removeClass('focussed');
                element.parent().parent().removeClass('focused');
                element.removeClass('focused');
            });
        },
    });
})

        .directive('onSelectFocussed', function () {
return ({
        restrict: 'A',
        link: function(scope, element) {
            element.focus(function () {
                element.parent().parent().addClass('focussed');
                element.addClass('focussed');
            });
            element.change(function () {
                element.parent().parent().removeClass('focussed');
                element.removeClass('focussed');
                element.blur();
            });
        },
    });
})

    .directive('onFilled', function () {
return ({
        restrict: 'A',
        link: function(scope, element) {
            element.focus(function () {
                if(element[0].value.length > 0){
                  element.addClass('filled');
                }else{
                  element.removeClass('filled');
                }
            });
            element.blur(function () {
                if(element[0].value.length > 0){
                  element.addClass('filled');
                }else{
                  element.removeClass('filled');
                }
            });
        },
    });
})

    .directive('onTagsFilled', function () {
return ({
        restrict: 'A',
        link: function(scope, element) {
          var input = angular.element(element[0].querySelector('input'))
          var ul = angular.element(element[0].querySelector('.tag-list'));
            element.focus(function () {
                if(ul.find('li').length > 0 || input[0].value.length > 0){
                  element.addClass('filled');
                }else{
                  element.removeClass('filled');
                }
            });
            element.blur(function () {
                if(ul.find('li').length > 0 || input[0].value.length > 0){
                  element.addClass('filled');
                }else{
                  element.removeClass('filled');
                }
            });
        },
    });
})
.directive('autoFillSync', function($timeout) {
   return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
          $timeout(function () {
              if(element[0].value.length > 0){
                  element.addClass('filled');
                }else{
                  element[0].value= null;
                }
          }, 100);
      }
   }
});