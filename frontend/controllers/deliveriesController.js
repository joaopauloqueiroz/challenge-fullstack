const app = angular.module('app', []);
app.controller('deliveries', function($scope, deliveriesService, $http) {
  $scope.name = "eu joão";
  $scope.address = "";
  $scope.formAddress = {};

 $scope.init = async function() {
    const data = await deliveriesService.listDeliveries()
    // console.log(data)
 }

 $scope.findAddress = async function() {
   const response = await deliveriesService.getAddress($scope.address);
   console.log(response)
  //  const data = response.results;

  //  $scope.formAddress.public_place = data[2]
  //  console.log($scope.formAddress)
 } 
})

