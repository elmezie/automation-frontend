// app/modules/patient/controllers.js
//.controller('AppCtrl', ['$scope','$http','$location', function($scope,$http,$location) {
angular.module('Dashboard',[]).controller('DashboardCtrl', function($scope,$ionicGesture,$ionicPopup,$ionicModal,$ionicSideMenuDelegate,$http,$location,PlaylistsService,myService,VideoService,LoaderService) {
    var current_page = $location.url()
    ionic.Platform.fullScreen() 
   
    $scope.rightMenuTemplate = 'templates/videomenu.html'
    $scope.hideSidemenuBackButton = true;
    var videoFilters = new Array();
    var videoFilter = {};

    $scope.x = "Playlist";
    //$scope.data = Poller.data;

    $scope.incrementDataInService= function(type) {
        console.log('incrementDataInService')
        // myService.getPlaylist().then(function(data){
        //     $scope.playlistdata = data
        // });
        //$scope.rightMenuTemplate = (type == 'video') ? 'templates/videomenu.html' : 'templates/musicmenu.html'
        
        if(type == 'video'){
            VideoService.getMenu().then(function(result){
                
                angular.forEach(result.data.objects, function(value, key) {
                    if(value.key == $scope.videoFilterType){
                        value.selected = true
                    }
                });
                $scope.playlistdata = result.data.objects
            })

            if(Object.keys(videoFilter).length == 0){
                VideoService.getFilterList('','').then(function(result){
                    $scope.filterData = result.data.objects
                });
                // VideoService.getFilters('','').then(function(result){
                //     console.dir(result.data.objects)
                //     $scope.filterData = result.data.objects
                //     console.log('filter data')
                //     console.dir($scope.filterData)
                // })
            }
            

        }else{
            myService.getPlaylist().then(function(data){
                $scope.playlistdata = data
            });
            console.log("playlist data")
            console.dir($scope.playlistdata)
        }
        
    }     


    $scope.$on('XChanged', function(event, x) {
        //$scope.x = x;
        console.dir(x)
        $scope.playlistdata = x;
    });    

    $scope.showTopLevelCategories = function () {
        VideoService.getFilterList().then(function(result){
            $scope.filterData = result.data.objects
        console.log('top level')
        console.dir(videoFilter)    

            angular.forEach(result.data.objects, function(value, key) {
                //value.selectedFilters = []
                var selectedFilters = []
                if( value.filter in videoFilter ){
                    angular.forEach(videoFilter[value.filter], function(value, key) {
                        console.log(value)
                        selectedFilters.push(value.title)
                    })
                    value.selectedFilters = selectedFilters.join()
                    console.log('selected filter')
                    console.dir(value.selectedFilters)
                }
                console.log('not found')


            });

        })
        
        $scope.hideSidemenuBackButton = true;

    };

    $scope.showSubcategories = function(item){
            console.log('show sub categories')
            console.dir(item)
            if(item.is_top_level){
                LoaderService.show();
                VideoService.getFilterList(item.filter).then(function(result){
                angular.forEach(result.data.objects, function(subvalue, key) {
                        var checkedValues = []
                        var currentValue = subvalue
                       //console.dir(value)
                    //   console.dir(videoFilters)on
                    //   console.log(item.filter)
                    //   console.dir(videoFilters[item.filter])
                    //   console.log( jQuery.inArray(value.key,videoFilters[item.filter])  )
                     
                    // if ( videoFilters[value.type] ){
                    //     console.dir(videoFilters[value.type])
                    //     console.dir(value.key)
                    //     console.log( jQuery.inArray(value.key,videoFilters[item.filter])  )
                    // }

                    angular.forEach( videoFilter[item.filter], function(value, key) {
                        console.log('the values')
                        console.log(subvalue)
                        console.dir(value)
                        //if( jQuery.inArray(currentValue.title,value) >=0 ){
                        if ( subvalue.key == value.key ){
                            console.log('item selected')
                            subvalue.selected = true
                            //checkedValues.push()
                        }


                    });

                    //value.
                    // if ( videoFilters[item.filter] && jQuery.inArray(value.key,videoFilters[item.filter]) >=0 ){
                    //     console.log('item selected')
                    //     value.selected = "true"

                    // }else{
                    //     console.log('non selected')
                    // }

                    subvalue.type = item.filter
                    // var index = videoFilters.indexOf(value.key);
                    // if (index > -1) {
                    //     value.selected = "true"
                    // }
                    
                });
                LoaderService.hide();
                console.dir(result.data.objects)
                    $scope.hideSidemenuBackButton = false;
                    $scope.filterData = result.data.objects
                    //$scope.filterData = result.data.objects
                })        

            }


            // VideoService.getFilters(cat).then(function(result){
            //     console.dir(result.data.objects)
            //     $scope.hideSidemenuBackButton = false;
            //     $scope.filterData = result.data.objects
            //     //$scope.filterData = result.data.objects
            // })        
    }
    // $scope.$on('XChanged', function(event, x) {
    //     //$scope.x = x;
    //     $scope.currentTrackInfo = x;
    // });    

    $scope.moveItem = function(item, fromIndex, toIndex) {
    //Move the item in the array
    // $scope.items.splice(fromIndex, 1);
    // $scope.items.splice(toIndex, 0, item);
        console.log(item,fromIndex,toIndex)
        // Move the files
        PlaylistsService.movePlaylist(fromIndex,toIndex).then($scope.incrementDataInService);


    };   

    $scope.closeSideMenu = function(){
        $ionicSideMenuDelegate.toggleRight($scope.$$childHead);
    };
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
        $scope.modal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Called when the form is submitted
    $scope.createTask = function(task) {
        $scope.tasks.push({
          title: task.title
        });
        $scope.taskModal.hide();
        task.title = "";
    };

    // Open our new task modal
    $scope.nowPlayingMusic = function() {
        $scope.modal.show();
    };

    // Close the new task modal
    $scope.closeNewTask = function() {
        $scope.modal.hide();
    };
    
    $scope.clearMusicPlaylist = function(){

        PlaylistsService.clearMusicPlaylist().then($scope.incrementDataInService);
    }

    $scope.browse = function(path,id,type,url){
        if(type == 'track'){
            PlaylistsService.playSong(id,url)
        }else{
            $location.path("/app/music/browse/"+id); // path not hash   
        }

    }

    $scope.savePlaylist = function(title){
       $scope.data = {}

       // An elaborate, custom popup
       var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.playlistname">',
            title: 'Playlist Name',
            scope: $scope,
            buttons: [
            { text: 'Cancel' },
            {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.data.playlistname) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                } else {
                    return $scope.data.playlistname;
                }
                }
           },
         ]
       }).then(function(res) {
            

            //$location.path("/app/music/radio/search/"+cmd+"/"+res+"/"+id)
            console.log('Playlist Name', res);
            PlaylistsService.savePlaylist(res)
            
        });
    }

 $scope.showPopup = function(id,cmd) {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.wifi">',
        title: 'Search Spotify',
        subTitle: 'Example : KQED',
        scope: $scope,
        buttons: [
        { text: 'Cancel' },
        {
            text: '<b>Search</b>',
            type: 'button-positive',
            onTap: function(e) {
                if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
            } else {
                return $scope.data.wifi;
            }
            }
       },
     ]
   }).then(function(res) {
        

        $location.path("/app/music/radio/search/"+cmd+"/"+res+"/"+id)
        //PlaylistsService.searchRadio(res)
        //console.log('Radio Station', res);
    });
}
   // myPopup.then(function(res) {
   //   console.log('Tapped!', res);
   // });


    $scope.radioLink = function(type,cmd,id){

        console.log("type: "+type)
        console.log("cmd: "+cmd)
        console.log("id: "+id)

        // console.log(type,cmd,id)
        if(type == 'xmlbrowser'){
            $location.path("/app/music/radio/"+cmd); // path not hash 
            //$scope.RadioType = cmd  
        }else if ( type == 'xmlbrowser_search'){
            $scope.showPopup(id,cmd)
            console.log("Browser Search")
        }else if (type == 'audio' || type == 'audio_playall' || type == 'pandora'){
            var pId = $location.path().split("/")[4]||"Unknown"; 
            if(cmd == 'add'){
                console.log('adddd')
                PlaylistsService.addToRadioPlaylist(pId,type,id)
            }else{
                PlaylistsService.playRadio(pId,type,id)    
            }
            

        }else if (type == 'link' || type == 'playlist'){
            if($location.path().split("/")[4] == 'search'){
                console.log("HERE1")
                var pId = $location.path().split("/")[5]||"Unknown";    //path will be /person/show/321/, and array looks like: ["","person","show","321",""]
            }else{
                console.log("HERE2")
                var pId = $location.path().split("/")[4]||"Unknown";
            }

            

            console.log("Radio Type: "+cmd)          
            console.log("Item Id: "+pId)  

            if(cmd == 'search'){
               $location.path("/app/music/radio/"+pId+"/"+id+"/"+type); // path not hash    
            }else{
                console.log("HERE3")
               $location.path("/app/music/radio/"+pId+"/"+id+"/"+type); // path not hash    
            }
            
        

        }else if (type == 'search'){
            var cmd = $location.path().split("/")[4]||"Unknown";    //path will be /person/show/321/, and array looks like: ["","person","show","321",""]
            $scope.showPopup(id,cmd)
            //PlaylistsService.searchRadio()

        }else{
            type = false
            console.log("HEREBOTTOM")
            var pId = $location.path().split("/")[5] || false

            if( pId == false ){
                var pId = $location.path().split("/")[4] 
            }else{
                var pId = $location.path().split("/")[4] ||"spotify";    
            }            
            
            console.log(pId)
            $location.path("/app/music/radio/"+pId+"/"+id+"/"+type); // path not hash    
        }
    }

    $scope.onchangeViewType = function(item){
        if(item.selected){
            console.log('onchange view type')
            $scope.videoFilterType = item.key    
            console.log($scope.videoFilterType)
            LoaderService.show();
            VideoService.filterVideo('',$scope.videoFilterType ).then(function(result){
                console.log('get filters')
                LoaderService.hide();
            }) 

        }
        
        if(item.selected == true && item.key != 'all'){
            // clear the fitlers
            videoFilter = {}
            $scope.showTopLevelCategories();

            // VideoService.filterVideo(jQuery.param({}),$scope.videoFilterType ).then(function(result){
            //     console.log('get filters')
            // }) 

            $scope.hideVideoFilters = false
        }else{
            $scope.hideVideoFilters = true
        }
        
    }

    $scope.onItemChanged = function(item){

        console.log('clicked')

        // var index = videoFilters.indexOf(item.key);
        // if(index > -1){
        //     // If value is already in the array , then remove it    
        //     videoFilters.splice(index,1)
        // }else{
            //console.log( jQuery.inArray(item.type,videoFilters)  )
            //testArray = item.type in videoFilters;
            //console.log(testArray)
            // console.log("videoFilters")
            
            // console.dir(item)
            if ( item.type in videoFilter ){
                console.log('exists')

                    // Loop through the filters
                    var found = false;
                    angular.forEach(videoFilter[item.type], function(value, key) {

                        // if the selected item is already in the filter then remove it
                        // otherwise add it
                            console.log(item.key,value.key)

                            if (item.key == value.key){
                                console.log('equals value')
                                console.log(key)
                                //videoFilters[item.type].splice(key,1)   
                                videoFilter[item.type].splice(key,1)   
                                found = true;    
                            }
                        
                    });

                    if(!found){
                        console.log('add item')
                        //videoFilters[item.type].push(item)
                        videoFilter[item.type].push(item)
                    }
                

               
            }else{
                console.log('non exists')
                //console.dir(item)
                // videoFilters.push(item.type)
                // videoFilters[item.type] = new Array();
                // videoFilters.push(item)

                
                
                videoFilter[item.type] = new Array();
                videoFilter[item.type].push(item)
                
            }
            
        //}

        console.dir('video filter')
        console.dir(videoFilter)
        console.log('output filters')
        output_filters = {}
        

        jQuery.each( videoFilter, function( filter_key, filter_value ) {  
            if( filter_key in output_filters){
                jQuery.each( filter_value, function( key, value ) {  
                    output_filters[filter_key].push(value.key)
                });
            }else{
                output_filters[filter_key] = new Array();
                jQuery.each( filter_value, function( key, value ) {  
                    output_filters[filter_key].push(value.key)
                });
                

            }

            // if (key in output_filters){
            //     output_filters[key].push(value.key)                
            // }else{
            //     output_filters[key] = new Array();
            //     output_filters[key].push(value.key)
            // }
        });

        console.dir(output_filters)

        // Take the filters and send them to the server 
        VideoService.filterVideo(jQuery.param(output_filters),$scope.videoFilterType ).then(function(result){
            console.log('get filters')
        }) 
    

        $scope.videoFilters = videoFilter
        console.log('on change')
        console.log($scope.videoFilterType)
        console.log($scope.videoFilters.length)
    }

    
    $scope.goTo = function(path_variable,toggleRight){
        console.log('path variable: '+path_variable)
        switch(path_variable){
            case "video_nowplaying":
                path_variable = 'video/nowplaying'
            break;
            case "nowplaying":
                // Pull the now playing information
                //$scope.currentTrackInfo = Poller.pollTest()
                // console.dir(Poller.pollTest())
                // console.log("HERE")
                // PlaylistsService.getCurrentInfo().then(function(data){
                //     $scope.currentTrackInfo = data

                // });

                toggleRight = toggleRight || true ;
                console.log(toggleRight)
                if(toggleRight === true){
                    $ionicSideMenuDelegate.toggleRight();
                }
            break;
            case "music":
                //console.dir(PlaylistsService)
                // PlaylistsService.playSong(songid,url).success(function(response){
                //         console.log("HERE")
                // });            
                $scope.x = "Music";

                // $scope.lists = [
                //     { item :'test' }
                // ]       
            break;
            case "movies":

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
                path_variable = 'movies'
            break;
            case "television":
                path_variable = 'television'
            break;
        }

        console.log("location path : "+ "/app/"+path_variable)

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
})
    // ********************************************************
    // * TickList                                             *
    // ********************************************************
    .directive('tickList', function () {
        return {
            restrict: 'E',
            transclude: true,
            template: '<ul class="list" ng-transclude></ul>',
            scope: {
                multiple: '@',
                selectedIcon: '@',
                $onChange: '&onChange'
            },
            controller: ['$scope', function ($scope) {
                var items = $scope.items = [];
                this.scope = $scope;

                this.addItem = function (item) {
                    items.push(item);
                };
                this.selectItem = function (item) {
                    $scope.$apply(function () {
                        if ($scope.multiple) {
                            item.$select(!item.model.selected);
                        } else {
                            var i, l = items.length;
                            for (i = 0; i < l; ++i) {
                                items[i].$select(false);
                            }
                            item.$select(true);
                        }
                    });
                }
            }]
        }
    })
    .directive('tickListItem', ['$ionicGesture', function ($ionicGesture) {
        return {
            restrict: 'E',
            require: '^tickList',
            transclude: true,
            scope: {
                selected: '@',
                $onChange: '&onChange',
                selectedIcon: '@',
                model: '='
            },
            template: '<li class="item item-icon-right" ><div ng-transclude></div><i ng-show="selected" class="icon"></i></li>',

            link: function (scope, element, attrs, tickListCtrl) {
                function tap() {
                    if(attrs.istoplevel == 0){
                        console.log('select item')
                        tickListCtrl.selectItem(scope);
                    }
                    console.log('is top level')
                    console.log(attrs.istoplevel)
                }

                scope.$select = function (value) {
                    var val = scope.model.selected;
                    scope.selected = value;
                    if (scope.model) scope.model.selected = value;
                    if (val != value) scope.$onChange(scope.model);
                };
                if (!scope.model) {
                    scope.model = {selected: scope.selected == 'true'};
                }

                //set selected icon: defined in: tickListItem -> tickList -> default
                element.find('i').addClass(scope.selectedIcon || tickListCtrl.scope.selectedIcon || 'ion-checkmark');
                tickListCtrl.addItem(scope);
                $ionicGesture.on('tap', tap, element);
            }
        }
    }]);