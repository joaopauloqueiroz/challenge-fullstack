const app = angular.module('app', []);
app.controller('deliveries', function($scope, deliveriesService, $http) {
  $scope.name = "";
  $scope.weight = "";
  $scope.address = "";
  $scope.formAddress = {};
  $scope.allDeliveries = [];
  $scope.weightTotal = 0
  $scope.ticket = 0;
 $scope.init = function() {
    deliveriesService.listDeliveries()
      .then(function(response) {
        $scope.allDeliveries = response.data;
        $scope.renderMap();
        $scope.calcValues();
      });
 }

 $scope.calcValues = function () {
  let total = 0
  for(let x = 0; x<$scope.allDeliveries.length; x++){
    total = total + $scope.allDeliveries[x].weight;
  }
  $scope.weightTotal = total;
  $scope.ticket = $scope.allDeliveries.length / $scope.weightTotal;
 }

 $scope.findAddress = function () {
   deliveriesService.getAddress($scope.address)
    .then(function(response) {
      const data = response.data.results[0];
      $scope.formAddress.address = {
        number: data.address_components[0].long_name,
        street: data.address_components[1].long_name,
        neighborhood: data.address_components[2].long_name,
        public_place: data.address_components[3].long_name,
        city: data.address_components[4].long_name,
        country: data.address_components[5].long_name,
        state: data.address_components[6].long_name,
      }

      $scope.formAddress.geolocation = {
        latitude: data.geometry.location.lat,
        longitude: data.geometry.location.lng
      }

      console.log(data)
      console.log($scope.formAddress)
    });
 }
 
 $scope.removeAll = function () {
   $scope.allDeliveries = []
   deliveriesService.removeAll();
 }

 $scope.removeOne = function (id) {
   $scope.updateMap(id)
   $scope.allDeliveries = $scope.allDeliveries.filter(item => item._id !== id);
   $scope.calcValues();
  //  deliveriesService.removeOne(id);
 }

 var map = L.map('map').setView([-23.5506507, -46.6333824], 7);
var markers = [];
 $scope.renderMap = function () {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    $scope.allDeliveries.map(item => {
      markers.push(L.marker([item.geolocation.latitude, item.geolocation.longitude]).addTo(map)
        .bindPopup("<center>" + item.name + "</center>" + "<center>" + item.weight + "Kg </center>")
        .openPopup());
    })
  }

  $scope.updateMap = function (id) {
    const index = $scope.allDeliveries.findIndex((el => el._id === id))
    markers[index].remove();
  }
})

