var app = angular.module('jsbin', []);

app.controller('DemoCtrl', function ($http, $sce) {
    this.name = 'Test';
    this.cards = [];
    
    $http.get( { url:'https://loapk3.fingertactic.com/card.php?do=GetAllCard',
        headers: {
            'Access-Control-Allow-Origin':'*'
        }
    })
        .success(function(data){
            console.log(data.found);
        });
});
