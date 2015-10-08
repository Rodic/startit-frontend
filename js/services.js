"use strict";

angular.module("startItServices", [
  'ngResource'
]);

angular.module("startItServices").factory("Events", [ "$resource",
  function($resource) {
    return $resource("http://localhost:3000/v1/events", {}, {
      get:  { method: "GET",  cache: false, isArray: true },
      post: { method: "POST", cache: false, isArray: false}
    });
  }
]);

angular.module("startItServices").factory("Profile", [ "$resource",
  function($resource) {
    return $resource("http://localhost:3000/v1/users/me", {}, {
      get: { method: "GET", cache: false, isArray: false }
    });
  }
]);
