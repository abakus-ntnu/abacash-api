'use strict';

angular.module('abacashApp')
  .factory('System', function ($resource) {
    return $resource('/api/systems/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: 
      {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      useSystem: 
      {
        method: 'GET',
        params: {
          id:'use'
        }
      },
      create: 
      {
        method: 'POST'
      }
    });
  });
