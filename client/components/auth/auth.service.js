'use strict';

angular.module('abacashApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q, $cookies, System) {

    var currentUser = {};
    var currentSystem = {};

    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    if($cookies.get('system')) {
      currentSystem = System.get({id: $cookies.get('systemId')});
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      restore: function(email, callback) {
        var cb = callback || angular.noop;

        return User.reset(
        {
          email: email
        }, function(response) {
          return cb(response);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      reset: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        this.clearSystem();
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      clearSystem: function() {
        $cookies.remove('system');
        $cookies.remove('systemId');
        $cookies.remove('systemDisplayName');
        currentSystem = {};
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      useSystem: function(id, callback) {
        var cb = callback || angular.noop;
        return System.useSystem({ controller: id },
         function(data) {
          currentSystem = data;
          return cb(data);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      inviteUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.inviteUser(user,
          function(data) {
            return cb(data);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      invite: function(user, callback) {
        var cb = callback || angular.noop;
        console.log(id)
        return User.invite({ controller: id }, user,
         function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      getInvite: function(id, callback) {
        var cb = callback || angular.noop;
        return User.getInvite({ controller: id }
        , function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      getRestore: function(restoreId, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },


      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * returns a list of the userroles from the server config
       *
       * @return {Object} user
       */
        /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      getNewUserData: function(callback) {
        var cb = callback || angular.noop;
        return User.new(
          function(data) {
          return cb(data);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * returns a list of the userroles from the server config
       *
       * @return {Object} user
       */
      getProductTypes: function() {
        return currentSystem.productTypes;
      },

      /**
       * returns a list of the userroles from the server config
       *
       * @return {Object} user
       */
      getCustomerRoles: function() {
        return currentSystem.customerRoles;
      },

      /**
       * returns a list of the systems avialiable for that user
       *
       * @return {Object} user
       */
      getCurrentSystem: function() {
        return currentSystem;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      hasInternalSales: function() {
        return currentSystem.internalSales;
      },

      isInSystem: function() {
         return currentSystem.hasOwnProperty('displayName');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isModerator: function() {
        return currentUser.role === 'moderator';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
