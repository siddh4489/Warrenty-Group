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
            if($scope.case.subject=='undefined' || $scope.case.description=='undefined' || $scope.case.subject=='' || $scope.case.description==''){
                $ionicPopup.alert({title: 'Alert', content: 'Please enter the Subject/Description.'});
            }else{
                Case.create($scope.case).success(function() {
                     $ionicPopup.alert({title: 'Thank You', content: 'A customer representative will contact you shortly.'});
                });
            }
        };

        function startChat(){
            //alert('startchat called');
            if (!window._laq) { window._laq = []; }
                window._laq.push(function(){liveagent.showWhenOnline('573j0000000GzbP', document.getElementById('liveagent_button_online_573j0000000GzbP'));
               // liveagent.showWhenOffline('573j0000000GzbP', document.getElementById('liveagent_button_offline_573j0000000GzbP'));
            });
             liveagent.init('https://d.la2w2.salesforceliveagent.com/chat', '572j0000000Gx9L', '00Dj0000001quZb');
        }

        $scope.chat = function() {
            var user = JSON.parse($window.localStorage.getItem('user'));
            //alert('Live chat called');
            startChat();
        };


    });
