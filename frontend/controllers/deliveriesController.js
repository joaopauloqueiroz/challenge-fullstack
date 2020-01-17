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
        let total = 0
         for(let x = 0; x<response.data.length; x++){
           total = total + response.data[x].weight;
         }
         $scope.weightTotal = total;
        $scope.renderMap()
        $scope.ticket = response.data.length / $scope.weightTotal;
      });

 }

 $scope.findAddress = function () {
   deliveriesService.getAddress($scope.address)
    .then(function(response) {
    });
 }
 
 $scope.removeAll = function () {
   $scope.allDeliveries = []
   deliveriesService.removeAll();
 }

 $scope.removeOne = function (id) {
   $scope.updateMap(id)
   $scope.allDeliveries = $scope.allDeliveries.filter(item => item._id !== id);
  //  deliveriesService.removeOne(id);
 }

 var map = L.map('map').setView([51.505, -0.09], 13);

 $scope.renderMap = function () {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    $scope.allDeliveries.map(item => {
     L.marker([item.geolocation.latitude, item.geolocation.longitude]).addTo(map)
        .bindPopup("<center>" + item.name + "</center>" + "<center>" + item.weight + "Kg </center>")
        .openPopup();
    })
  }

  $scope.updateMap = function (id) {
    $scope.allDeliveries.map(item => {
      L.marker([item.geolocation.latitude, item.geolocation.longitude]).remove()
     })
  }
})

