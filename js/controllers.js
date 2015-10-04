"use strict";

angular.module("startItControllers", []);

angular.module("startItControllers").controller("EventsController", ["$scope", "Events",
  function($scope, Events) {

    // Set map
    $scope.mapConfig = {
      center: {
        latitude: 44.818611,
        longitude: 20.468056
      },
      zoom: 12
    };

    // Display events on the map
    $scope.events = [];

    Events.get(
      function success(events, responseHeaders) {
        events.forEach(function(e, i) {
          $scope.events.push({
            coords: {
              latitude: e.start_latitude,
              longitude: e.start_longitude
            },
            id: e.id,
            icon: 'images/' + e.type + '.png',
            display: false,
            event: e
          });
        },
      function failure(httpResponse) {
        console.log(httpResponse);
      })
    });
  }]
);

angular.module("startItControllers").controller("EventsNewController", ["$scope", "Events",
  function($scope, Events) {

    // Set map
    $scope.mapConfig = {
      center: {
        latitude: 44.818611,
        longitude: 20.468056
      },
      zoom: 12
    };

    $scope.eventModel = {};

    $scope.createEvent = function() {
      Events.post(
        { event: $scope.eventModel },
        function success(event, responseHeaders) {
          $scope.eventErrors = {};
          console.log(event);
        },
        function failure(httpResponse) {
          var errors = httpResponse.data;
          $scope.eventErrors = {};
          angular.forEach(errors, function(msg, field) {
            $scope.eventErrors[field] = msg[0];
          });
          console.log($scope.eventErrors);
        }
      )
    };
  }
]);

angular.module("startItControllers").controller("SigninController", ["$scope", "$auth", "$location",
  function($scope, $auth, $location) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function() {
        $location.path('/');
      });
    };

    $scope.signout = function() {
      $auth.logout();
    };

    $scope.isSinged = function() {
      return $auth.isAuthenticated();
    };
  }
]);
