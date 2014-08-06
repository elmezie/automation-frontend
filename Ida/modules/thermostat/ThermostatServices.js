angular.module('Thermostat').factory('ThermostatService',function($http,$rootScope,$timeout,API_URL,API_PORT){
    var ergastAPI = {};
    
    ergastAPI.getThermostat = function(){
        return $http({
           method:'GET',
           url: API_URL+':'+API_PORT+'/thermostat',
           params: { id: 1 , location:0 }
        });
    }
    
	return ergastAPI;    
});