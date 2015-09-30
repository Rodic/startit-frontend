"use strict";

angular.module("startItControllers", []);

angular.module("startItControllers").controller("EventsController", ["$scope", "Events",
  function($scope, Events) {

    // Set map
    var mapProp = {
      center:    new google.maps.LatLng(44.818611, 20.468056),
      zoom:      12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    // Display events on the map
    Events.get(
      function(events, responseHeaders) {
        events.forEach(function(e) {
          var marker = new google.maps.Marker({
            position:  new google.maps.LatLng(e.start_latitude, e.start_longitude)
          });

          // Info windows
          var infowindow = new google.maps.InfoWindow({
            content: e.description + '<br>' + e.start_time
          });

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });

          marker.setMap(map);
        },
      function(httpResponse) {
        console.log(httpResponse);
      })
    });
  }]
);

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
