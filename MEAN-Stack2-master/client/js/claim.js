angular.module('nibs.claim', ['nibs.config'])

    // Routes
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.claimcall', {
                url: "/claimForm",
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
    .controller('ClaimController', function ($scope, $window, $ionicPopup, Claim) {
       

        $scope.claim = {};

        $scope.submit = function () {
            if($scope.claim.Name=='undefined'  || $scope.claim.Name=='' ){
                $ionicPopup.alert({title: 'Alert', content: 'Please enter the Subject/Description.'});
            }else{
                Claim.create($scope.claim).success(function() {
                     $ionicPopup.alert({title: 'Thank You', content: 'A customer representative will contact you shortly.'});
                });
            }
        };


    });
