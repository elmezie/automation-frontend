// app/modules/patient/controllers.js
//.controller('AppCtrl', ['$scope','$http','$location', function($scope,$http,$location) {
angular.module('Dashboard',[]).controller('DashboardCtrl', ['$scope','$http','$location',function($scope,$http,$location) {
    var current_page = $location.url()
    ionic.Platform.fullScreen() 

    $scope.goTo = function(path_variable){
        switch(path_variable){
            case "music":
                $scope.lists = [
                    { item :'test' }
                ]       
            break;
            case "video":

                $scope.lists = [
                    {item : 'All movies'},
                    {item : 'Recently Released'},
                    {item : 'Recently Added'},
                    {item : 'Recently Viewed'},
                    {item : 'On Deck'},
                    {item : 'By Rating'},
                    {item : 'By Folder'},
                    {item : 'Genre'}
                ]               
            break;
        }
        // $scope.lists = [
        //  { item :'test' }
        // ]        

        $location.path("/app/"+path_variable); // path not hash
    }   

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }

  ];
}])
