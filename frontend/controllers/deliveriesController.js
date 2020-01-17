const app = angular.module('app', []);
app.controller('deliveries', function($scope, deliveriesService, $http) {
  $scope.name = "";
  $scope.weight = "";
  $scope.address = "";
  $scope.form = {};
  $scope.allDeliveries = [];
  $scope.weightTotal = 0
  $scope.ticket = 0;
  $scope.latitude = "";
  $scope.longitude = "";
  $scope.errors = [];
  let coutMaker = 0;
  $scope.init = function() {
      deliveriesService.listDeliveries()
        .then(function(response) {
          $scope.allDeliveries = response.data;
          coutMaker = response.data.length -1;
          $scope.renderMap();
          $scope.calcValues();
        });
  }

  $scope.calcValues = function () {
    let total = 0;
    for(let x = 0; x<$scope.allDeliveries.length; x++){
      total = total + $scope.allDeliveries[x].weight;
    }
    $scope.weightTotal = total;
    $scope.ticket = $scope.allDeliveries.length / $scope.weightTotal
  }

  $scope.findAddress = function () {
      deliveriesService.getAddress($scope.address)
      .then(function(response) {
        const data = response.data.results[0];
        $scope.cleanAddress(data);
        $scope.form.geolocation = {
          latitude: data.geometry.location.lat,
          longitude: data.geometry.location.lng
        }

        $scope.latitude = data.geometry.location.lat;
        $scope.longitude = data.geometry.location.lng;
      });
  }

  $scope.cleanAddress = function (data) {
    $scope.form.address = {}
    data.address_components.forEach(part => {
      if (part.types.includes("country")) {
        $scope.form.address.country = part.long_name
      }

      if (part.types.includes("route")) {
        $scope.form.address.street = part.long_name
      }

      if (part.types.includes("sublocality_level_1")) {
        $scope.form.address.neighborhood = part.long_name 
      }

      if (part.types.includes("street_number")) {
        $scope.form.address.number = part.long_name 
      }

      if (part.types.includes("administrative_area_level_2")) {
        $scope.form.address.city = part.long_name 
      }

      if (part.types.includes("administrative_area_level_1")) {
        $scope.form.address.state = part.long_name 
      }

      if (part.types.includes("subpremise")) {
        $scope.form.address.complement = part.long_name 
      }
      
    });
  }

  $scope.registerClient = function () {
    $scope.form.name = $scope.name;
    $scope.form.weight = $scope.weight;
    deliveriesService.registerClient($scope.form)
    .then((response) => {
      $scope.errors = []
      $scope.allDeliveries.push(response.data)
      $scope.calcValues();
      $scope.addMarker()
      $scope.name = "";
      $scope.weight = "";
      $scope.latitude = "";
      $scope.longitude = "";
      $scope.address = "";
    }).catch(error => {
      if(error.status === 400) {
        $scope.errors = error.data.errors;
      }
    })
  }
  
  $scope.removeAll = function () {
    $scope.allDeliveries.map((item, index) => markers[index].remove())
    $scope.allDeliveries = []
    deliveriesService.removeAll();
  }

  $scope.removeOne = function (id) {
    $scope.updateMap(id);
    $scope.allDeliveries = $scope.allDeliveries.filter(item => item._id !== id);
    $scope.calcValues();
    deliveriesService.removeOne(id);
  }

  const map = L.map('map').setView([-23.5506507, -46.6333824], 7);
  const markers = [];
  $scope.renderMap = function () {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

    $scope.allDeliveries.map((item, i) => {
      let icon = L.divIcon({
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<div class="custom-pin" >
          <span class="number-item">${i}</span>
        </div>`
      })
      markers.push(L.marker([item.geolocation.latitude, item.geolocation.longitude], {icon: icon}).addTo(map)
        .bindPopup("<center>" + item.name + "</center>" + "<center>" + item.weight + "Kg </center>")
        .openPopup());
    })
  }

    $scope.addMarker = function () {
      coutMaker++;
      let icon = L.divIcon({
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<div class="custom-pin" >
          <span class="number-item">${coutMaker}</span>
        </div>`
      })
      markers.push(L.marker([$scope.form.geolocation.latitude, $scope.form.geolocation.longitude], {icon: icon}).addTo(map)
          .bindPopup("<center>" + $scope.name + "</center>" + "<center>" + $scope.weight + "Kg </center>")
          .openPopup());
    }

    $scope.updateMap = function (id) {
      const index = $scope.allDeliveries.findIndex((el => el._id === id));
      markers[index].remove();
      coutMaker--;
    }
})

