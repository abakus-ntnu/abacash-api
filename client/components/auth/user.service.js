'use strict';

angular.module('abacashApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
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
      getInvite: 
      {
        method: 'GET',
        params: {
          id:'invite'
        }
      },
      new: 
      {
        method: 'GET',
        params: {
          id:'new'
        }
      },
      inviteUser: 
      {
        method: 'POST',
        params: {
          id:'invite'
        }
      },
      invite: 
      {
        method: 'PUT',
        params: {
          id:'invite'
        }
      },
      restore: 
      {
        method: 'PUT',
        params: {
          id:'reset'
        }
      },
      getRestore: 
      {
        method: 'GET',
        params: {
          id:'reset'
        }
      },
      reset: 
      {
        method: 'PUT',
        params: {
          id:'restore'
        }
      },
      get: 
      {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
