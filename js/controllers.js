"use strict";

angular.module("startItControllers", []);

angular.module("startItControllers").controller("EventsController", ["$scope", "Events",
  function($scope, Events) {
    $scope.events = Events.get();
  }]
)
