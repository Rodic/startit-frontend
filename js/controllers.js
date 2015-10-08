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

angular.module("startItControllers").controller("EventsNewController", ["$scope", "Events", "$location",
  function($scope, Events, $location) {

    $scope.eventModel = {};

    // Set map
    $scope.mapConfig = {
      center: {
        latitude: 44.818611,
        longitude: 20.468056
      },
      zoom: 12
    };

    $scope.picker = {
      coords: $scope.mapConfig.center,
      options: {
        draggable: true
      },
      id: 1,
      events: {
        dragend: function (marker, eventName, args) {
          $scope.eventModel.start_latitude = marker.getPosition().lat();
          $scope.eventModel.start_longitude = marker.getPosition().lng();
        }
      }
    }

    $scope.createEvent = function() {
      Events.post(
        { event: $scope.eventModel },
        function success(event, responseHeaders) {
          $scope.eventErrors = {};
          $location.path("/");
        },
        function failure(httpResponse) {
          var errors = httpResponse.data;
          $scope.eventErrors = {};
          angular.forEach(errors, function(msg, field) {
            $scope.eventErrors[field] = msg[0];
          });
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

angular.module("startItControllers").controller("ProfileController", [ "$scope", "Profile",
  function($scope, Profile) {
    Profile.get(
      function success(profile, responseHeaders) {
        $scope.profile = profile;
      },
      function failure(httpResponse) {
        $scope.profile = {}
      }
    );
  }
]);
