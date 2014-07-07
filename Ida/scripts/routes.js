
angular.module('MainApp')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'DashboardCtrl'
    })
 

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
          ,controller:'DashboardCtrl'
        }
      }
    })
  

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    // .state('app.browse', {
    //   url: "/browse",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/browse.html"
    //     }
    //   }
    // })
  


    .state('app.music', {
      url: "/music",
      views: {
        'menuContent' :{
          templateUrl: "templates/music.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })    

    .state('app.artists', {
      url: "/music/artists",
      views: {
        'menuContent' :{
          templateUrl: "templates/artists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.artists_id', {
      url: "/music/artists/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/artists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })    

    .state('app.playlists', {
      url: "/music/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.genres', {
      url: "/music/genres",
      views: {
        'menuContent' :{
          templateUrl: "templates/genres.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.music_search', {
      url: "/music/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/music_search.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    // .state('app.genres_id', {
    //   url: "/music/genres/:id",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/genres.html",
    //       controller: 'PlaylistsCtrl'
    //     }
    //   }
    // })

    .state('app.radio_browser', {
      url: "/music/radio/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/radio.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })


    .state('app.radio_browse', {
      url: "/music/radio/:id/:searchby/:type",
      views: {
        'menuContent' :{
          templateUrl: "templates/radio.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.radio_search_mode', {
      url: "/music/radio/search/:mode/:searchby/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/radio_search.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })  

    .state('app.radio_search', {
      url: "/music/radio/search/:searchby/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/radio_search.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })    
    .state('app.musicapps', {
      url: "/music/apps",
      views: {
        'menuContent' :{
          templateUrl: "templates/apps.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })    
    .state('app.radio', {
      url: "/music/radio",
      views: {
        'menuContent' :{
          templateUrl: "templates/radio.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.browse', {
      url: "/music/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.browse_id', {
      url: "/music/browse/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })    
    .state('app.browse_tracks', {
      url: "/music/browse/folder/:id/tracks",
      views: {
        'menuContent' :{
          templateUrl: "templates/songs.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })        

    .state('app.albums', {
      url: "/music/albums",
      views: {
        'menuContent' :{
          templateUrl: "templates/albums.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.albums_id', {
      url: "/music/albums/:searchby/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/albums.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.songs', {
      url: "/music/songs",
      views: {
        'menuContent' :{
          templateUrl: "templates/songs.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })


    .state('app.songs_id', {
      url: "/music/songs/:searchby/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/songs.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.movies',{
      url: "/movies",
      views: {
        'menuContent' :{
          templateUrl: "templates/video.html",
          controller: 'VideoCtrl'
        }
      }
    })

    .state('app.television_episode',{
      url: "/television/episodes/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/television_episodes.html",
          controller: 'VideoCtrl'
        }
      }
    })   

    .state('app.television_episode_detail',{
      url: "/television/episode/:video_id",
      views: {
        'menuContent' :{
          templateUrl: "templates/video_detail.html",
          controller: 'VideoCtrl'
        }
      }
    })   



    .state('app.television_season',{
      url: "/television/seasons/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/television_seasons.html",
          controller: 'VideoCtrl'
        }
      }
    })   

    .state('app.television',{
      url: "/television",
      views: {
        'menuContent' :{
          templateUrl: "templates/television.html",
          controller: 'VideoCtrl'
        }
      }
    })           

    .state('app.video',{
      url: "/video",
      views: {
        'menuContent' :{
          templateUrl: "templates/video.html",
          controller: 'VideoCtrl'
        }
      }
    })
  
      .state('app.video_detail',{
        url: "/video/details/:video_id",
        views: {
            'menuContent' :{
                templateUrl: "templates/video_detail.html",
                controller:'VideoCtrl'

            }
        }

    })
    // .state('app.playlists', {
    //   url: "/playlists",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/playlists.html",
    //       controller: 'PlaylistsCtrl'
    //     }
    //   }
    // })

  .state('app.thermostat', {
      url: "/thermostat",
      views: {
        'menuContent' :{
          templateUrl: "templates/thermostat.html",
          controller:'ThermostatCtrl'
        }
      }
    })

   
    .state('app.lights', {
      url: "/lights",
      views: {
        'menuContent' :{
          templateUrl: "templates/lights.html"
        }
      }
    })

  
      .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html"
        }
      }
    })
  
    .state('app.dash', {
      url: '/thermostat/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/thermostat/dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('app.nowplayingmusic', {
      url: '/nowplaying',
      views: {
        'menuContent': {
          templateUrl: 'templates/nowplaying.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.nowplayingvideo', {
      url: '/video/nowplaying',
      views: {
        'menuContent': {
          templateUrl: 'templates/video_nowplaying.html',
          controller: 'VideoCtrl'
        }
      }
    })    

    .state('app.logitech', {
      url: '/control/logitech',
      views: {
        'menuContent': {
          templateUrl: 'templates/logitech.html',
          controller: 'RemoteCtrl'
        }
      }
    })     
    // .state('app.albums', {
    //   url: "/artists/:albumId",
    //   views: {
    //     'menuContent' :{
    
    //       controller: 'AlbumCtrl'
    //     }
    //   }
    // }) 
    .state('app.playlistId', {
      url: "/music/playlists/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists_tracks.html",
          controller: 'PlaylistsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

