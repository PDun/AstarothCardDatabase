var app = angular.module('jsbin', []);

app.controller('DemoCtrl', function ($http, $sce) {
    this.name = 'Test';
    
    $http.get('data/cards.json')
        .success(function(data){
            this.cards = data.data.Cards;
        });
});
