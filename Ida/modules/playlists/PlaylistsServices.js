angular.module('Playlists').factory('PlaylistsService', function($http,$rootScope,$timeout,API_URL,API_PORT) {
    var ergastAPI = {};

    ergastAPI.getRadio = function(identifier,start,limit,type,radioType){
        return $http({
            method: 'GET',
            url: API_URL+':'+API_PORT+'/music/radio',
            params: { type: type , identifier : identifier , page:start, per_page:limit , radioType:radioType  }
        })
    }

    ergastAPI.searchRadio = function(query,start,limit,item_id,mode){
        return $http({
            method: 'GET',
            url:API_URL+':'+API_PORT+'/music/search',
            params: { mode: mode, searchby: query, id: item_id, page:start , per_page:limit }
                            
        })
    }

    ergastAPI.getApps = function(identifier,start,limit,type){
        //console.log(identifier,start,limit,type)
        return $http({
            method: 'GET',
            url: API_URL+':'+API_PORT+'/music/apps',
            params: { type: type , identifier : identifier  }
        })
    }    

    ergastAPI.getFolder = function(folder_id,start,limit) {
        return $http({
            method: 'GET', 
            url: API_URL+':'+API_PORT+'/music/browse',
            params: {  folder_id: folder_id, page:start , per_page:limit  }
        
        });
    }

    ergastAPI.getPlaylistById = function(start,limit,id) {
        return $http({
            method: 'GET', 
            url: API_URL+':'+API_PORT+'/music/playlist',
            params: {  page: start, per_page: limit, id: id }
        
        });
    }

    ergastAPI.getDrivers = function(endpoint,searchon,id,searchby,start,limit) {
        return $http({
            method: 'GET', 

            url: API_URL+':'+API_PORT+'/'+endpoint+'/search',
            params: {  searchby: searchby, id: id, mode: searchon , page:start , per_page:limit  }
        
        });
    }

    var transform = function(data){
        return $.param(data);
    }

    ergastAPI.seek_to = function(seconds){
        return $http({
            method: "post",
            headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest:transform,
            url:API_URL+':'+API_PORT+'/music/player',
            data:{
                action:'seek',
                identifier:seconds
            }
        })
    }

    ergastAPI.changeVolume = function(vol){
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            url: API_URL+':'+API_PORT+'/music/playlist',
            data:{
                action: 'changeVolume',
                identifier: vol
            }

        })
    }
    
    ergastAPI.playRadio = function(cmd,type,id){
        console.log( cmd,type,id)
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            transformRequest:transform,
            url:API_URL+':'+API_PORT+'/music/radio',
            data:{
                action: 'play',
                identifier: id,
                cmd:cmd,
                type:type
            }
        })
    }

    ergastAPI.addToRadioPlaylist = function(cmd,type,id){
        console.log( cmd,type,id)
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            transformRequest:transform,
            url:API_URL+':'+API_PORT+'/music/radio',
            data:{
                action: 'add',
                identifier: id,
                cmd:cmd,
                type:type
            }
        })
    }
    ergastAPI.togglePlay = function(){
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            url: API_URL+':'+API_PORT+'/music/player',
            data:{
                action: 'toggle'
            }

        })        
    }
    ergastAPI.playlistNext = function(){
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            url: API_URL+':'+API_PORT+'/music/player',
            data:{
                action: 'next'
            }

        })        
    }    
    ergastAPI.playlistPrevious = function(){
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            url: API_URL+':'+API_PORT+'/music/player',
            data:{
                action: 'previous'
            }

        })        
    }    
    ergastAPI.playSong = function(songId,url){
        // return $http.post(
        //     API_URL+':'+API_PORT+'/music/playlist',
        //     { action:'play', identifier:identifier}
        // );
        

        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            url: API_URL+':'+API_PORT+'/music/playlist',
            data:{
                action: 'play',
                identifier: url,
                id:songId
            }

        })
    }

    ergastAPI.getCurrentInfo = function(){
          // return $http.get(API_URL+':'+API_PORT+'/music/playlist').then(function(result){
          //        $rootScope.$broadcast('XChanged', result.data.objects);
          //       return result.data.objects;
          //   });        
        return $http({
            method: 'GET', 
            url: API_URL+':'+API_PORT+'/music/track'
        }).then(function(result){
            $rootScope.$broadcast('trackinfoChanged', result.data.objects);
            //$timeout(ergastAPI.getCurrentInfo, 1000);
            return result.data.objects
        })
        
    }

    ergastAPI.movePlaylist = function(fromIndex,toIndex){
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            url: API_URL+':'+API_PORT+'/music/playlist',
            data:{
                action: 'move',
                fromIndex:fromIndex,
                toIndex:toIndex
            }

        })          

    }

    ergastAPI.savePlaylist = function(playlistTitle){
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            url: API_URL+':'+API_PORT+'/music/playlist',
            data:{
                action: 'save',
                identifier:playlistTitle
            }

        })          

    }
    ergastAPI.clearMusicPlaylist = function(){
        // return $http.post(
        //     API_URL+':'+API_PORT+'/music/playlist',
        //     { action:'play', identifier:identifier}
        // );
        return $http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            url: API_URL+':'+API_PORT+'/music/playlist',
            data:{
                action: 'clear',
                identifier: false
            }

        })        

        // return $http({
        //     method: "post",
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        //     transformRequest: transform,
        //     url: API_URL+':'+API_PORT+'/music/playlist',
        //     data:{
        //         action: 'play',
        //         identifier: url
        //     }

        // })
    }    

    return ergastAPI;    
});
