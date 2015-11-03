angular.module('starter.controllers', [])

        .controller('EmployeeListCtrl', function ($scope, EmployeeService, UserAuthService) {

            $scope.searchKey = "";

            $scope.clearSearch = function () {
                $scope.searchKey = "";
                $scope.employees = EmployeeService.getEmployees();
            }

            $scope.search = function () {
                EmployeeService.getEmployeesByFirstName($scope.searchKey).success(function (data) {
                    $scope.employees = data.Employees;
                });

            }

            EmployeeService.getEmployees().success(function (data) {

                $scope.employees = data.Employees;
                //$scope.trainSteps = $scope.createTrainStops($scope.shopjobs);
            });
            $scope.userProfile = UserAuthService.getLoggedInUserProfile();
        })

        .controller('EmployeeDetailCtrl', function ($scope, $stateParams, EmployeeService, UserAuthService) {
            //console.log('details');
            EmployeeService.getEmployeeDetailByID($stateParams.PersonId).success(function (data) {
                $scope.employee = data;
            });
            EmployeeService.getExpenseDetailsByExpenseID('300000115338121').success(function (data) {

                var graph_labels = new Array();
                var graph_data = new Array();
                for (var i = 0; i < data.Lines.length; i++) {
                    graph_labels.push(data.Lines[i].ExpenseTypeName);
                    graph_data.push(data.Lines[i].Amount);
                }
                //alert(graph_labels)
                //alert(graph_data)
                $scope.graph_labels = graph_labels;
                $scope.graph_data = graph_data;

            });
            $scope.userProfile = UserAuthService.getLoggedInUserProfile();


        })

		.controller('IncidentListCtrl', function ($scope, IncidentService, UserAuthService){
            IncidentService.getIncidents().success(function (data) {

                $scope.incidents = data.items;

            });
            $scope.userProfile = UserAuthService.getLoggedInUserProfile();
		})
        .controller('LoginController', function ($scope, $ionicModal, $timeout,
                $ionicPopover, $ionicHistory, UserAuthService) {
            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope,
                animation: 'slide-in'

            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.message = '';

            $scope.user = {
                username: null,
                password: null
            };

            $scope.login = function () {
                UserAuthService.login($scope.user.username, $scope.user.password);
            };

            $scope.logout = function () {
                UserAuthService.logout();

            };

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            $scope.$on('event:auth-loginRequired', function (e, rejection) {
                $scope.modal.show();
            });

            $scope.$on('event:auth-loginConfirmed', function () {
                $scope.username = null;
                $scope.password = null;
                $scope.modal.hide();

            });

            $scope.$on('event:auth-login-failed', function (e, status) {
                //console.log(status);
                var error = "Login failed.";
                console.log(status);
                if (status == 401) {
                    error = "Invalid Credentials ";
                }

                if (status == 403) {
                    error = "Access Denied";
                }

                $scope.message = error;

            });

        })

        .factory('localstorage', ['$window', function ($window) {
                return {
                    set: function (key, value) {
                        $window.localStorage[key] = value;
                    },
                    get: function (key, defaultValue) {
                        return $window.localStorage[key] || defaultValue;
                    },
                    setObject: function (key, value) {
                        $window.localStorage[key] = JSON.stringify(value);
                    },
                    getObject: function (key) {
                        return JSON.parse($window.localStorage[key] || '{}');
                    },
                    remove: function (key) {
                        $window.localStorage.removeItem(key);
                    }
                };
            }])
        ;
