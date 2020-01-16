const app = angular.module('app', []);
app.controller('deliveries', function($scope, deliveriesService, $http) {
  $scope.name = "";
  $scope.weight = "";
  $scope.address = "";
  $scope.formAddress = {};
  $scope.allDeliveries = new Array();

 $scope.init = async function() {
    const data = await deliveriesService.listDeliveries()
    $scope.allDeliveries = data
    console.log(data)
 }

 $scope.findAddress = async function() {
   const response = await deliveriesService.getAddress($scope.address);
   console.log(response)
  //  const data = response.results;

  //  $scope.formAddress.public_place = data[2]
  //  console.log($scope.formAddress)
 }
 
 $scope.removeAll = async function () {
   const response = await deliveriesService.removeAll()
 }
})

