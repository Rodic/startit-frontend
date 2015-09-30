"use strict";

angular.module("startIt", [
  "ngRoute",
  "startItServices",
  "startItControllers",
  "satellizer"
]);

angular.module("startIt").config(["$routeProvider", "$authProvider",
  function($routeProvider, $authProvider) {
    $routeProvider.
      when("/", {
        templateUrl: "partials/events.html",
        controller:  "EventsController"
      }).
      when("/signin", {
        templateUrl: "partials/signin.html",
        controller:  "SigninController"
      });

    $authProvider.
      facebook({
        clientId: '968873116502496',
        url: 'http://localhost:3000/v1/auth/facebook/callback'
    });
  }
]);
