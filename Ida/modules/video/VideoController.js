// app/modules/patient/controllers.js
//.controller('AppCtrl', ['$scope','$http','$location', function($scope,$http,$location) {

angular.module('Video',[]).controller('VideoCtrl', function($stateParams,$scope,$http,$location,VideoService,LoaderService) {
    $scope.myData = {};
    $scope.myData.showVideo = true;    

        LoaderService.show();        
        // VideoService.filterVideo('','all').then(function(result){
        //         console.log("done")
        //         console.dir(result.data.objects['MediaContainer'])
        //         $scope.videos = result.data.objects['MediaContainer']
        //         LoaderService.hide();
        // }) 


    $scope.loadVideos = function(type){
        //VideoService.load_videos('','all')
        VideoService.filterVideo('','all',type).then(function(result){
                console.log("done")
                console.dir(result.data.objects['MediaContainer'])
                $scope.videos = result.data.objects['MediaContainer']
                LoaderService.hide();
        })      
    }
    

    $scope.televisionSeasons = function(){
        VideoService.getSeason($stateParams.id).then(function(result){
            console.log('load season:'+  $stateParams.id)
            console.dir(result.data.objects['MediaContainer']['Directory'])
            
            if (result.data.objects['MediaContainer']['Directory'].length === undefined ){
                $scope.televisionMultipleSeasons = false
                console.log("here")
            }else{
                $scope.televisionMultipleSeasons = true
                console.log("here2")
            }            
            $scope.televisionSeasons = result.data.objects['MediaContainer']

            LoaderService.hide();
            //$scope.video_detail = result.data.MediaContainer.Video
            //console.dir(result.data.objects.Genre)
        })        
    }

    $scope.televisionEpisodes = function(){
        VideoService.getEpisode($stateParams.id).then(function(result){
            console.log('load episodes:'+  $stateParams.id)
            console.log(result.data.objects['MediaContainer']['Video'])
            if (result.data.objects['MediaContainer']['Video'].length === undefined ){
                $scope.televisionMultipleEpisodes = false
            }else{
                $scope.televisionMultipleEpisodes = true
                console.log("here2")
            }
            //console.dir(result.data.objects['MediaContainer'].length)
            $scope.televisionEpisodes = result.data.objects['MediaContainer']
            LoaderService.hide();
            //$scope.video_detail = result.data.MediaContainer.Video
            //console.dir(result.data.objects.Genre)
        })        
    }

    $scope.load_videonowplaying = function(){
        console.log('load video details')
        VideoService.nowPlaying().then(function(result){
            console.dir(result.data.MediaContainer)
        });
    }


    $scope.metadata = function(){
        
        VideoService.getVideo($stateParams.video_id).then(function(result){
            console.log('load metadata:'+  $stateParams.video_id)
            //console.dir(result.data.MediaContainer.Video)
            $scope.video_detail = result.data.MediaContainer.Video
            LoaderService.hide();
            //console.dir(result.data.objects.Genre)
        })
    }

    $scope.$on('VideosChanged', function(event, x,y,z) {
        //$scope.x = x;
        console.log("videos changed")
        if(y === undefined && z === undefined){
            console.log('main')
        }else{
            
            console.log('real')
            $scope.videos = x
        }
        
    }); 

    $scope.play = function(key){
        
        VideoService.play(key)
    }
    // // Create and load the Modal
    // $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    //     $scope.SortModal = modal;
    // }, {
    //     scope: $scope,
    //     animation: 'slide-in-up'
    // });

    // // Called when the form is submitted
    // $scope.createTask = function(task) {
    //     $scope.tasks.push({
    //         title: task.title
    //     });

    //     $scope.taskModal.hide();
    //     task.title = "";
    // };    

    // $scope.SortList = function(){
    //     $scope.SortModal.show();
    // }
})
