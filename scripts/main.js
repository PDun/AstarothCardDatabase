var app = angular.module('jsbin', []);

app.controller('DemoCtrl', function ($http) {
    this.name = 'Test';
    this.cards = [];
    $http({
        method: 'GET',
        url: 'https://loapk3.fingertactic.com/card.php?do=GetAllCard&phpp=FACEBOOK&phpl=EN&pvc=2.0&pvb=2016-09-13%2014%3A52%3A31&sns=KONGREGATE&origin='
      }).then(function successCallback(response) {
          this.cards = response.Cards
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
});


