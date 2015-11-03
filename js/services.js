angular.module('starter.services', [])
		.factory('IncidentService', function ($http, localstorage, UserAuthService, HostMcsUrl, MCSBackendID) {
					return{
						getIncidents: function(){
							var getUrl = HostMcsUrl + '/mobile/custom/incident/incidents?contact=lynn';
		                    var req = {
		                        method: 'GET',
		                        url: getUrl,
		                        headers: {
		                            'Content-Type': 'application/json',
		                            'Oracle-Mobile-Backend-Id': MCSBackendID,
		                            'Authorization': localStorage.getItem('authToken')
		                        }
		                    };
		                    var resp = $http(req);
		                    console.log("Response" + resp.data);
		                    return resp;
							
						}
					}
				})
        .factory('UserAuthService', ['$window', '$location', '$http', '$rootScope',
            'HostMcsUrl', 'MCSBackendID', '$ionicHistory', '$state', 'localstorage',
            function ($window, $location, $http, $rootScope, HostMcsUrl, MCSBackendID,
                    $ionicHistory, $state, localstorage) {
                return {
                    login: function (username, password) {

						var loginUrl = HostMcsUrl + '/mobile/custom/incident/incidents?contact=lynn';
                        var authHeader = 'Basic ' + btoa(username + ':' + password);
                        var req = {
                            method: 'GET',
                            url: loginUrl,
                            /* we should look automate this process here as well */
                            headers: {
                                'Content-Type': 'application/json',
                                'Oracle-Mobile-Backend-Id': MCSBackendID,
                                'Authorization': authHeader
                            }

                        };
//                        console.log(req);

                        $http(req)
                                .success(function (data) {
                                    //console.log(data);
                                    // if all good go to the latest page where you was, in our case remove the login

                                    localstorage.set('logged_in_user', username);
                                    localstorage.set('authToken', authHeader);
                                    localstorage.setObject('workOrders', data);
                                    $rootScope.$broadcast('event:auth-loginConfirmed');

                                    // find way to reset the controler
                                    //$state.go($state.current, {}, {reload: true});
                                    $state.transitionTo('incidents', {}, {
                                        location: true,
                                        inherit: true,
                                        relative: $state.$current,
                                        notify: true
                                    });

                                })
                                .error(function (keyValue) {
                                    console.log(keyValue);
                                    // DO NOT PUT ANYTHING HERE INSIDE, IT WILL BE HANDLED BY THE INTERCEPTOR
                                });

                        //return $http(req);
                    },
                    logout: function () {
                        if ($window.localStorage.getItem('logged_in_user')) {
                            localstorage.remove('logged_in_user');
                            $rootScope.$broadcast('event:auth-loginRequired');

                            // clear history, BUT this DOES NOT reset the CONTROLLERS
                            $ionicHistory.clearHistory();
                            $ionicHistory.clearCache();
                            alert("logout")
                            $state.transitionTo('login', {}, {
                            location: true,
                            inherit: true,
                            relative: $state.$current,
                            notify: true
                        });
                        }
                    },
                    isLoggedIn: function () {
                        console.log('Checking if user is logged in');
                        if ($window.localStorage.getItem('logged_in_user')) {
                            console.log('token exists in local storage');
                            return true;
                        } else {
                            console.log('token not found. user nt logged in');
                            return false;
                        }
                    },
                    getLoggedInUserProfile: function () {
                        console.log('Checking if user is a service Writer');
                        if ($window.localStorage.getItem('logged_in_user')) {
                            console.log('token exists in local storage');
                            var profile = {};
                            var username = $window.localStorage.getItem('logged_in_user');
                            if (username == 'helenMills') {
                                profile.username = username;
                                profile.name = 'Helen Mills';
                                profile.role = 'service_writer';
                            } else if (username == 'casey') {
                                profile.username = username;
                                profile.name = 'Casey Brown';
                                profile.role = 'technician';
                            } else if (username == 'angie') {
                                profile.username = username;
                                profile.name = 'Angie McGaha';
                                profile.role = 'service_writer';
                            }
                            return profile;
                        } else {
                            console.log('token not found. user not logged in');
                            return null;
                        }
                    }


                };
            }
        ]);