angular.module('nibs.claim', ['nibs.config'])

    // Routes
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.claim', {
                url: "/claim",
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
    .controller('ClaimController', function ($scope, $window, $ionicPopup, Case) {
       

        $scope.claim = {};

        $scope.submit = function () {
            if($scope.claim.subject=='undefined' || $scope.claim.description=='undefined' || $scope.claim.subject=='' || $scope.claim.description==''){
                $ionicPopup.alert({title: 'Alert', content: 'Please enter the Subject/Description.'});
            }else{
                Claim.create($scope.claim).success(function() {
                     $ionicPopup.alert({title: 'Thank You', content: 'A customer representative will contact you shortly.'});
                });
            }
        };


    });
