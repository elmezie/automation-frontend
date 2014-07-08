// app/modules/patient/controllers.js

angular.module('Playlists').controller('PlaylistsCtrl', function($scope,debounce,poller,greet1,$resource,$timeout,$http,$stateParams,$location,$ionicModal,PlaylistsService,myService) {
    

    var endpoint = $location.path().split("/")[2]||null; 
    var searchon = $location.path().split("/")[3]||null;
    

    // var pId = $location.path().split("/")[3]||"Unknown"; 
    var requestCounter = 0;
    var requestLimit = 100;
    var timeoutId = null;
    var dataSrc = [];
    $scope.genrelist = [];
    $scope.hasMoreData = true;
    $scope.hidebars = false;
    
    $scope.items = [];
    $scope.nameFilter = null;
    $scope.stopped = false

    $scope.x = 1;
    // $scope.incrementDataInService= function(type) {
    //     console.log("incrementDataInService playlistController")
    //     $scope.rightMenuTemplate = (type == 'video') ? 'templates/videomenu.html' : 'templates/musicmenu.html'
    //     // console.log($scope.rightMenuTemplate)

    //     if(type == 'video'){
    //         $scope.playlistdata = [
    //             {item : 'All movies'},
    //             {item : 'Recently Released'},
    //             {item : 'Recently Added'},
    //             {item : 'Recently Viewed'},
    //             {item : 'On Deck'},
    //             {item : 'By Rating'},
    //             {item : 'By Folder'},
    //             {item : 'Genre'}
    //         ]  
    //     }else{
    //         myService.getPlaylist().then(function(data){
    //             $scope.playlistdata = data
    //         });
    //     }
        
    // }


    $scope.updateNewFn = function(msg){
        
        console.log("Scope Stopped")
        //console.log($scope.stopped)
        if(!$scope.stopped){
            $scope.poller1.stop()   
            $scope.stopped = true;  
            console.log("Stopped here") 
        }
        //$scope.fn(msg)
        //$scope.poller1.stop()
    }

    $scope.updateFn = function(msg,type){
        // Update the new time
        
        console.log("HERE")        
        console.log(msg)
        if(type == 'volume'){
            PlaylistsService.changeVolume(msg)
        }else{
            $scope.stopped = false;

            PlaylistsService.seek_to(msg).then(function(data){
                $scope.poller1.start()
            })
        }
        console.log("released")        
        //$scope.fn(msg)
        //$scope.poller1.start()
        //$scope.stopped = false;   
    }

    $scope.fn = debounce(600, function(msg) {
      // update the time
       //$scope.poller1.start()
    console.log(msg)
     PlaylistsService.seek_to(msg).then(function(data){
        $scope.poller1.start()
     })
     console.log("released")

    }) 

    $scope.change_player_mode = function(mode){
        console.log("player mode :" + mode)
        PlaylistsService.changePlayerMode(mode).then(function(data){
            console.log('mode changed')
            console.log(data)
        })
    }
    
    $scope.togglePlay = function(){
        PlaylistsService.togglePlay();
    }
    $scope.playlistNext = function(){
        PlaylistsService.playlistNext();
    }    
    $scope.playlistPrevious = function(){
        PlaylistsService.playlistPrevious();
    }    
    $scope.initTest = function(){
        //var myResource = $resource('http://192.168.1.7:5000/music/track');
        $scope.poller1 = poller.get(greet1, {action: 'jsonp_get', delay: 61200});
        $scope.poller1.promise.then(null, null, function (data) {
            $scope.currentTrackInfo = data.objects
            // //$scope.data1 = data;
            // //console.dir(data.objects)
            //$scope.data = data.objects.elapsed
            switch(data.objects.mode){
                case "stop":
                    $scope.playerMode = 'ion-play'
                break;
                case "pause":
                    $scope.playerMode = 'ion-play'
                break;
                case "play":
                    $scope.playerMode = 'ion-pause'
                break;


            }

            $scope.someObj = { data: data.objects.elapsed };
            // $scope.max = data.objects.duration
            // $scope.knobOptions = {
            //     'width':200,
            //     'displayInput': true,
            //     'max': 20,
            //     'fgColor':"#66CC66",
            //     'skin':'tron',
            //     'thickness':'.3',
            //     'angleOffset':-125,
            //     'angleArc':250

            // }; 
           
        });
        
       //     $scope.max = 60;
            //$scope.someObj = { data: data.objects.elapsed };
            // $scope.knobRelease = true
            // $scope.knobOptions = {
            //     'width':200,
            //     'displayInput': true,
            //     'max':80
            // }; 


        //console.dir(myResource)
        // var myPoller = poller.get(myResource);
        // myPoller.promise.then(function(data){
        //    console.log('success') 
        //    console.log(data) 
        // }, function(){
        //     console.log("error")

        // }, function(){
        //     console.log('notify')
        // });

        //$scope.currentTrackInfo = Poller.pollTest()
         // PlaylistsService.getCurrentInfo().then(function(data){
         //        $scope.currentTrackInfo = data

         //    });        
        console.log("HERE TEsting")
    }

    $scope.$on('trackinfoChanged', function(event, x) {
        //$scope.x = x;
        //$scope.currentTrackInfo = x
        
    });        
    // $scope.$on('XChanged', function(event, x) {
    //     //$scope.x = x;
    //     // console.dir(event)
    //     // console.dir(x)

    //     $scope.currentTrackInfo = x;
    // });      


    $scope.$watch('currentTrackInfo.volume', function(response) {
        $scope.mixVolume = response

        if( $scope.mixVolume - response != 0 ){
            console.log($scope.mixVolume - response)
        }
        //console.dir($scope.currentTrackInfo.volume)
        //console.log($scope.currentTrackInfo - response)

        // if(timeoutId !== null) {
        //     console.log('Ignoring this movement');
        //     return;
        // }
        
        // // console.log('Not going to ignore this one');
        // timeoutId = $timeout( function() {
            
        //     console.log('It changed recently!');
            
        //     $timeout.cancel(timeoutId);
        //     timeoutId = null;
            
        //     // Now load data from server 
        // }, 1000); 
        
        
    });    
    // $scope.$on('XChanged', function(event, x) {
    //     console.dir(x)
    //     $scope.x = x;
    // });   

    $scope.test = function(){
        alert("HERE")
    }

    $scope.share = function(){
        alert("add to playlist")
    }

      $scope.itemButtons = [
    {
      text: 'Edit',
      type: 'button-assertive',
      onTap: function(item) {
        alert('Edit Item: ' + item.id);
      }
    },
    {
      text: 'Share',
      type: 'button-calm',
      onTap: function(item) {
        alert('Share Item: ' + item.id);
      }
    }
  ];    

   $scope.back = function() { 
        // Disable the poller
        console.log('going going back back')
        $scope.poller1.stop()   
        
        window.history.back();
    };    

    $scope.close = function() {
        $scope.modal.hide();
    };   
	// PlaylistsService.getDrivers().success(function (response) {
 //        	$scope.genrelist = response
	// });

    $scope.addToPlaylist = function(itemUrl,radioType){
        myService.addToPlaylist(itemUrl,radioType).then($scope.incrementDataInService)
        // myService.getPlaylist().then(function(data){
        //     $scope.playlistdata = data
        // });
    }

 

    $scope.playNow = function(itemUrl,radioType){
        myService.playNow(itemUrl,radioType).then($scope.incrementDataInService)
        // myService.getPlaylist().then(function(data){
        //     $scope.playlistdata = data
        // });
    }

    $scope.load_playlist = function(){
        console.log('load playlist')
        $scope.playlist_title = 'Title Playlist'
    }

    $scope.clearMusicPlaylist = function(){
        myService.clearMusicPlaylist().then($scope.incrementDataInService)

    }
    $scope.playSong = function(songid,url){
        console.log('playlist service play song')
        console.log(songid)
        PlaylistsService.playSong(songid,url).success(function(response){
            if($scope.hidebars){
                $scope.hidebars = false
            }
        });

    }

    $scope.searchFilter = function (driver) {
        //var keyword = new RegExp($scope.nameFilter, 'i');
        //console.log(keyword)
        //return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
    };    

	$scope.loadMore = function(event) {
        requestCounter++;
        
        searchby = $stateParams.searchby || null;
        id = $stateParams.id ||null;
        mode = $stateParams.mode || "radio";
        type = $stateParams.type || null;
        
        var start = (requestCounter - 1) * requestLimit;
        console.log(event)
        if( event == 'browse'){
            $scope.fruits = PlaylistsService.getFolder(id,start,requestLimit).success(function (response) {
            var datas = response.objects
            var total_num_results = response.total_num_results

            console.log(total_num_results,requestLimit,requestCounter)

            // if(datas[0].type == 'track'){
            //     $location.path("/app/music/browse/folder/"+id+"/tracks"); // path not hash
            // }
            



            $scope.genrelist  = $scope.genrelist.concat(datas);
            if(total_num_results < requestLimit){
                $scope.hasMoreData = false;
            }
            if (((requestCounter - 1) * requestLimit) > total_num_results){
                console.log("HERE")
                $scope.hasMoreData = false;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');

            });            
            
        }else if (event=='apps'){
            $scope.fruits = PlaylistsService.getApps(searchby,start,requestLimit,id).success(function (response) {
                var datas = response.objects
                var total_num_results = response.total_num_results
                $scope.genrelist = $scope.genrelist.concat(datas);

                console.log(total_num_results)
                console.log(requestLimit)
                console.log(requestCounter)
                if(total_num_results < requestLimit){
                    $scope.hasMoreData = false;
                }                
                if (((requestCounter - 1) * requestLimit) > total_num_results){
                    $scope.hasMoreData = false;
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');                
            });   

        }else if(event =='search_radio'){
            console.log("search by:"+searchby)
            console.log("item_id:"+id)
            console.log('search radio')
            $scope.fruits = PlaylistsService.searchRadio(searchby,start,requestLimit,id,mode).success(function(response){
                var datas = response.objects;
                var total_num_results = response.total_num_results;
                $scope.genrelist = $scope.genrelist.concat(datas)
                if(total_num_results < requestLimit){
                    $scope.hasMoreData = false;
                }                
                if (((requestCounter - 1) * requestLimit) > total_num_results){
                    $scope.hasMoreData = false;
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');  

            })

        }else if(event == 'radio'){
            

            $scope.fruits = PlaylistsService.getRadio(searchby,start,requestLimit,id,type).success(function (response) {
                var datas = response.objects
                var total_num_results = response.total_num_results
                $scope.genrelist = $scope.genrelist.concat(datas);

                console.log(total_num_results)
                console.log(requestLimit)
                console.log(requestCounter)
                if(total_num_results < requestLimit){
                    $scope.hasMoreData = false;
                }                
                if (((requestCounter - 1) * requestLimit) > total_num_results){
                    $scope.hasMoreData = false;
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');                
            });

        
        }else if(event=='playlists'){
            console.log("mode:"+mode)
            console.log("id:"+id)
            console.log('get playlist')
            $scope.fruits = PlaylistsService.getPlaylistById(start,requestLimit,id,mode).success(function(response){
                var datas = response.objects;
                var total_num_results = response.total_num_results;
                $scope.genrelist = $scope.genrelist.concat(datas)
                if(total_num_results < requestLimit){
                    $scope.hasMoreData = false;
                }                
                if (((requestCounter - 1) * requestLimit) > total_num_results){
                    $scope.hasMoreData = false;
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');  

            })
        }else{

            console.log(endpoint,searchon,id,searchby,type)

            $scope.fruits = PlaylistsService.getDrivers(endpoint,searchon,id,searchby,start,requestLimit).success(function (response) {
            
         	
			//var datas = dataSrc.slice(start, start + requestLimit);
            var datas = response.objects
            var total_num_results = response.total_num_results
            
            if(total_num_results < requestLimit){
                $scope.hasMoreData = false;
            }

            $scope.genrelist  = $scope.genrelist.concat(datas);
            if (((requestCounter - 1) * requestLimit) > total_num_results){
                $scope.hasMoreData = false;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }
    //     // $http.get('/more-items').success(function(items) {
    //     //     useItems(items);
    //     //     $scope.$broadcast('scroll.infiniteScrollComplete');
    //     // });
    };

    // $scope.$on('stateChangeSuccess', function() {
    //     $scope.loadMore();
    // });

    });


