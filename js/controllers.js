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

angular.module("startItControllers").controller("EventsNewController",
  ["$scope", "Events", "$location", "LocalProfile",
  function($scope, Events, $location, LocalProfile) {

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
      coords: angular.copy($scope.mapConfig.center),
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
          LocalProfile.update();
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

angular.module("startItControllers").controller("EventController",
  ["$scope", "$routeParams", "Event", "Participations", "LocalProfile",
  function($scope, $routeParams, Event, Participations, LocalProfile) {
    $scope.mapConfig = {
      zoom: 12
    }
    Event.get(
      { id: $routeParams.id },
      function success(event, responseHeaders) {
        $scope.event = event;
        $scope.event.coords = {
          latitude:  event.start_latitude,
          longitude: event.start_longitude
        };
        $scope.mapConfig.center = angular.copy($scope.event.coords);
        $scope.event.options = {};
        $scope.event.options.icon = "images/" + event.type + ".png";
      },
      function failure(httpResponse) {
        $scope.event = {};
      }
    );
    $scope.joinEvent = function() {
      Participations.post(
        { participation: { event_id: $scope.event.id } },
        function success(participation, responseHeaders) {
          LocalProfile.update();
          $scope.event.participants.push(LocalProfile.get());
        },
        function failure(httpResponse) {
          //
        }
      );
    }
  }
]);

angular.module("startItControllers").controller("SessionsController",
  ["$scope", "$auth", "$location", "LocalProfile",
  function($scope, $auth, $location, LocalProfile) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function() {
        LocalProfile.update();
        $location.path('/');
      });
    };

    $scope.profile = LocalProfile;

    $scope.signout = function() {
      $auth.logout();
      LocalProfile.destroy();
      $location.path('/');
    };

    $scope.isSinged = function() {
      return $auth.isAuthenticated();
    };
  }
]);
