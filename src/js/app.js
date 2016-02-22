'use strict';

var app = angular.module("todo", ["ui.router"]);

app.controller("MainCtrl", function($scope, $http) {
  var autoIP = "http://api.wunderground.com/api/dec8bf3b3a454036/geolookup/q/autoip.json"
  var autoZip, autoTemp, city, state;

  var promise = $http.get(autoIP)
  .then(function(response1) {
    autoZip = response1.data.location.zip
    var zipUrl = "http://api.wunderground.com/api/dec8bf3b3a454036/conditions/q/" + autoZip + ".json";
    return $http.get(zipUrl);
  }).then(function(response2) {
    autoTemp = response2.data.current_observation.temp_f;
    $scope.temp = autoTemp;
    $scope.city = response2.data.current_observation.display_location.city;
    $scope.state = response2.data.current_observation.display_location.state_name;
  });

  $scope.weatherSearch = function() {
    var cityState = $scope.cityState.toLowerCase().split(", ");
    var city = cityState[0];
    var state = cityState[1];
    var url = "http://api.wunderground.com/api/dec8bf3b3a454036/conditions/q/" + state + "/" + city + ".json";
    var weather;

    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(data) {
      weather = data.data.current_observation;
      $scope.temp = weather.temp_f;
      $scope.city = data.data.current_observation.display_location.city;
      $scope.state = data.data.current_observation.display_location.state_name;

    }, function errorCallback(error) {
      console.log(error);
    });

    $scope.cityState = "";
  }

})
