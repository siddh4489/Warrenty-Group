angular.module('nibs.home', ['nibs.config'])

    // Routes
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: "/homepage",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/home.html",
                        controller: "HomeController"
                    }
                }
            })
    })

    // Services
    .factory('Home', function ($http, $rootScope) {
        return {
            create: function(theHome) {
                return $http.post($rootScope.server.url + '/homes/', theHome);
            }
        };
    })

    //Controllers
    .controller('HomeController', function ($scope, $window, $ionicPopup, Home, User) {
       

        $scope.home = {};

        $scope.submit = function () {
            
                Home.create($scope.claim).success(function() {
                     $ionicPopup.alert({title: 'Thank You', content: 'A customer representative will contact you shortly.'});
                });
          
        };

    });
