angular.module('starter.controllers', [])

.constant("MCSBaseURL", {
			url: "https://mcsoutboundpmtrial1dev-mcsoutboundpmtrialidm.mobileenv.us2.oraclecloud.com:443"
			}
		)
		

.controller('DashCtrl', function($scope) {})

.controller('IncidentsCtrl', function($scope, MCSBaseURL) {
	console.log("Base MCS URL: " + MCSBaseURL.url);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
