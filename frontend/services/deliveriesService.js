
app.service('deliveriesService', function ($http) {
  this.listDeliveries = function() {
    return $http.get('http://localhost:3333/deliveries')
  }

  this.getAddress = function(address) {
    return $http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=AIzaSyCEYIGOcgru2noH5loO938ZKRSGyfvhN78`)
  }

  this.removeAll = function () {
    return $http.delete('http://localhost:3333/deliveries')
  }

  this.removeOne = function (id) {
    return $http.delete(`http://localhost:3333/deliveries/${id}`)
  }

  this.registerClient = function (data) {
    return $http.post(`http://localhost:3333/deliveries`, data)
  }
})