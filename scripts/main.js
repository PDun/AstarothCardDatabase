var app = angular.module('jsbin', []);

app.controller('DemoCtrl', function ($http, $sce) {
    var ctrl = this;
    ctrl.name = 'Test';
    
    $http.get('data/cards.json')
        .success(function(data){
            ctrl.cards = data.data.Cards;
        });
});
