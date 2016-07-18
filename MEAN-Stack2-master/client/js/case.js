angular.module('nibs.case', ['nibs.config'])

    // Routes
    .config(function ($stateProvider) {
        $stateProvider
            .state('app.help', {
                url: "/help",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/case.html",
                        controller: "CaseCtrl"
                    }
                }
            })
    })

    // Services
    .factory('Case', function ($http, $rootScope) {
        return {
            create: function(theCase) {
                return $http.post($rootScope.server.url + '/cases/', theCase);
            }
        };
    })

    //Controllers
    .controller('CaseCtrl', function ($scope, $window, $ionicPopup, Case, User) {
        var user = JSON.parse($window.localStorage.getItem('user'));
        console.log('the user email is'+user.email);
        startChat();
        var SOSPlugin = {
            createEvent: function(Email) {
            //alert('sos method called');
                cordova.exec(
                    null,
                    null,
                    'SOSPlugin', // mapped to our native Java class called "CalendarPlugin"
                    'callNativeMethod', // with this action name
                    [{                  // and this array of custom arguments to create our entry
                        "Email": user.email,
                    }]
                );
             }
             }

        $scope.case = {};

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

//        $scope.sos = function(){
//           //alert('sos called')
//           $window.location = 'sos://' + user.email;
//           SOSPlugin.createEvent(user.email);
//        };
    });
