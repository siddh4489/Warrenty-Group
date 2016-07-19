angular.module('nibs.homeview', ['nibs.config'])

    // Routes
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.homepage', {
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
    .factory('Homeview', function ($http, $rootScope) {
        return {
            create: function(theHome) {
                return $http.post($rootScope.server.url + '/homeviews/', theHome);
            }
        };
    })

    //Controllers
    .controller('HomeController', function ($scope, $window, $ionicPopup, Homeview, User) {
       

        $scope.homeview = {};

        $scope.submit = function () {
            
                Homeview.create($scope.homeview).success(function() {
                     $ionicPopup.alert({title: 'Thank You', content: 'A customer representative will contact you shortly.'});
                 });
          
        };

    });
