"use strict";

angular.module("startItDirectives", []);

angular.module("startItDirectives").directive("dateTimePicker", [
  function() {
    return {
      restrict: "A",
      require: 'ngModel',
      link: function(scope, elem, attrs) {
        elem
          .datetimepicker({
            format: 'DD/MM/YYYY HH:mm',
          })
          // Workaround. Simply date select didn't change underlying ng-model
          .on(
            "dp.change", function() { elem.trigger( "change" ); }
          );
      }
    }
  }]
);
