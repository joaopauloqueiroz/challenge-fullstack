const baseURL = 'http://localhost:3333';
const key = 'AIzaSyCEYIGOcgru2noH5loO938ZKRSGyfvhN78';

app.service('deliveriesService', function ($http) {
  this.listDeliveries = function() {
    return $http.get(`${baseURL}/deliveries`)
  }

  this.getAddress = function(address) {
    return $http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${key}`)
  }

  this.removeAll = function () {
    return $http.delete(`${baseURL}/deliveries`)
  }

  this.removeOne = function (id) {
    return $http.delete(`${baseURL}/deliveries/${id}`)
  }

  this.registerClient = function (data) {
    return $http.post(`${baseURL}/deliveries`, data)
  }
})