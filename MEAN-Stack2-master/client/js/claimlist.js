angular.module('nibs.claimlist', ['nibs.config'])

    // Routes
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.claimlist', {
                url: "/claimlist",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/claimlist.html",
                        controller: "ClaimListController"
                    }
                }
            })
    })

    // Services
    .factory('Claimlist', function ($http, $rootScope) {
        return {
            create: function(theClaim) {
                return $http.post($rootScope.server.url + '/claimlists/', theClaim);
            }
        };
    })

    //Controllers
    .controller('ClaimListController', function ($scope, $window, $ionicPopup, Claimlist, User) {
       

});
