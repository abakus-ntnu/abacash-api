'use strict';
angular.module('abacashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.login', {
            url: 'login',
            views: {
                'main@': {
                    templateUrl: 'app/account/login/login.html',
                    controller: 'LoginCtrl',
                }
            }
        })
        .state('app.invite', {
            url: 'invite/:id',
            views: {
                'main@': {
                    templateUrl: 'app/account/invite/invite.html',
                    controller: 'InviteCtrl',
                }
            },
             resolve: {
                 user: ['$stateParams', 'Auth', function($stateParams, Auth) {
                      return Auth.getInvite($stateParams.id)
                        .then( function(user) {
                          return user
                        })
                        .catch( function(err) {
                          return err;
                        });
                 }]
             }
        })
        .state('app.me', {
            url: 'me',
            views: {
                'main@': {
                    templateUrl: 'app/account/settings/settings.html',
                    controller: 'SettingsCtrl',
                }
            }
        })
        .state('app.reset', {
            url: 'reset',
            views: {
                'main@': {
                    templateUrl: 'app/account/reset/reset.html',
                    controller: 'ResetCtrl',
                }
            }
        })
        .state('app.reset.restore', {
            url: '/:id',
            views: {
                'main@': {
                    templateUrl: 'app/account/restore/restore.html',
                    controller: 'RestoreCtrl',
                }
            }
        });
  });