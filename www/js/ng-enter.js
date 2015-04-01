'use strict';

/*
 * Use like ng-click anywhwere 
 * you want to call a function
 * by pressing the enter key
 * <form ng-enter="somefunction(args)>"
 * */


var app = angular.module('cs');

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});