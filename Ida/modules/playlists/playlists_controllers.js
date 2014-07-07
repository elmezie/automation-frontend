// app/modules/patient/controllers.js
//.controller('AppCtrl', ['$scope','$http','$location', function($scope,$http,$location) {
angular.module('Playlists',[]).controller('PlaylistsCtrl', ['$scope','$http','$location',function($scope,$http,$location) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }

    ];
}])
