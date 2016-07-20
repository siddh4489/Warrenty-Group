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
            getClaimList: function(theClaimlist) {
                return $http.post($rootScope.server.url + '/claimlists/', theClaimlist);
            }
        };
    })

    //Controllers
    .controller('ClaimListController', function ($scope, $window, $ionicPopup, Claimlist, User) {
       
       
        $scope.claimlist = {};

        $scope.submit = function () {
            
                Claimlist.getClaimList($scope.claim).success(function(datalist) {
                   
                    
                });
          
          };

  });
