MainApp.factory('myService', function($http,$rootScope,API_URL,API_PORT) {


    // var ergastAPI = {};
    // ergastAPI.getDrivers = function(endpoint,searchon,id,searchby,start,limit) {
    //     return $http({
    //         method: 'GET', 

    //         url: API_URL+':'+API_PORT+'/'+endpoint+'/search',
    //         params: {  searchby: searchby, id: id, mode: searchon , page:start , per_page:limit  }
        
    //     });
    // }

    // var ergastAPI = {};

    // ergastAPI.getPlaylist = function(){
    //     var promise  = $http({
    //         method:'GET',
    //         url:API_URL+':'+API_PORT+'/music/playlist'
    //     });   

    //     var data = promise.success(function(response){
    //         return response
    //     });

    //     return data
    // }
    var transform = function(data){
        return $.param(data);
    }

    return {
        getPlaylist: function(callback){
            
                   
            return $http.get(API_URL+':'+API_PORT+'/music/playlist').then(function(result){
                 $rootScope.$broadcast('XChanged', result.data.objects);
                console.log("return data")     
                return result.data.objects;
            });
        },

        playNow: function(itemurl,radioType){
            return  $http({
                method: 'POST', 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform ,
                url: API_URL+':'+API_PORT+'/music/playlist',
                data: {
                    action:'play',
                    identifier:itemurl,
                    id:radioType
                }

            }).then(function(result){
                return result;
            })

            // return $http.post(API_URL+':'+API_PORT+'/music/playlist',{params: {action:'add',identifier:itemurl}}).then(function(result){
            //     return result;
            // })
        },
        addToPlaylist: function(itemurl,radioType){
            console.log("Held down data")
            console.log(itemurl,radioType)
            return  $http({
                method: 'POST', 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform ,
                url: API_URL+':'+API_PORT+'/music/playlist',
                data: {
                    action:'add',
                    identifier:itemurl,
                    id:radioType
                }

            }).then(function(result){
                return result;
            })

            // return $http.post(API_URL+':'+API_PORT+'/music/playlist',{params: {action:'add',identifier:itemurl}}).then(function(result){
            //     return result;
            // })
        }
    }

    // var x=5 ;
    // return {
    //     increase : function() {
    //         x++;
    //         //$rootScope.$broadcast('XChanged', x);
    //     },

    //     getPlaylist: function(){
    //         //$rootScope.$broadcast('XChanged', x);
    //         var promise  = $http({
    //             method:'GET',
    //             url:API_URL+':'+API_PORT+'/music/playlist'
    //         });        

    //         // var successdata = data.success(function(response){
    //         //     return response
    //         // });

    //         //console.dir(successdata)
            
    //     }
    // };

})
