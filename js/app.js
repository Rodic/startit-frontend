"use strict";

angular.module("startIt", [
  "ngRoute",
  "startItServices",
  "startItControllers",
  "startItDirectives",
  "satellizer",
  "uiGmapgoogle-maps"
]);

angular.module("startIt").config(["$routeProvider", "$authProvider",
  function($routeProvider, $authProvider) {
    $routeProvider.
      when("/", {
        templateUrl: "partials/events.html",
        controller:  "EventsController"
      }).
      when("/events/new", {
        templateUrl: "partials/new_event.html",
        controller:  "EventsNewController"
      }).
      when("/events/:id", {
        templateUrl: "partials/event.html",
        controller:  "EventController"
      }).
      when("/signin", {
        templateUrl: "partials/signin.html",
        controller:  "SigninController"
      }).
      when("/profile", {
        templateUrl: "partials/profile.html",
        controller:  "ProfileController"
      });

    $authProvider.facebook({
      clientId: '968873116502496',
      url: 'http://localhost:3000/v1/auth/facebook/callback'
    });

    $authProvider.google({
      clientId: '496950853036-mh0jf2f13mtc4h0r47akcati6ssffu5q.apps.googleusercontent.com',
      url: 'http://localhost:3000/v1/auth/google/callback'
    });
  }
]);
