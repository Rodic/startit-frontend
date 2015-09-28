"use strict";

angular.module("startIt", [
  "ngRoute",
  "startItServices",
  "startItControllers"
]);

angular.module("startIt").config(["$routeProvider",
  function($routeProvider) {
    $routeProvider.
      when("/", {
        templateUrl: "partials/events.html",
        controller:  "EventsController"
      });
  }
]);
