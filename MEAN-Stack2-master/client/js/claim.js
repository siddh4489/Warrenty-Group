angular.module('nibs.claim', ['nibs.config'])

    // Routes
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.claim', {
                url: "/claimform",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/claim.html",
                        controller: "ClaimController"
                    }
                }
            })
    })

    // Services
    .factory('Claim', function ($http, $rootScope) {
        return {
            create: function(theClaim) {
                return $http.post($rootScope.server.url + '/claims/', theClaim);
            }
        };
    })

    //Controllers
    .controller('ClaimController', function ($scope, $window, $ionicPopup, Claims, User) {
       

        $scope.claim = {};

        $scope.submit = function () {
            
                Claim.create($scope.claim).success(function() {
                     $ionicPopup.alert({title: 'Thank You', content: 'A customer representative will contact you shortly.'});
                });
          
        };

    });
