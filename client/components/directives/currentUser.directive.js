 angular.module('abacashApp')
   .directive('userMenu', function($timeout, $window, $rootScope) {
      return {
        scope: {
            clearSystem: '&',
            settings: '&',
            logout: '&'
        },
        link: function (scope, element, attrs) {

            var body = angular.element(document).find('body');
            var result = document.getElementsByClassName("abacash-navbar");
            var navbar = angular.element(result);

            element.bind('mousedown', function(){
                if(navbar[0].querySelector('.abacash-user-subnavbar') === null ){
                    var userMenu = createUserMenu()
                    navbar.append(userMenu);
                    $timeout(function(){
                         isAbort(userMenu);
                         angular.element($window).bind('resize', function() {
                            isResize(userMenu);
                        });
                    }, '20');
                }
            });

            var isAbort = function(userHeader){
                body.bind('mousedown', function(event){
                    if(event.pageY > 143){
                        userHeader.detach();
                    }
                    if(event.pageY < 70){
                        userHeader.detach();
                    }
                });
            }

            var isResize = function(userHeader){
                userHeader.detach();
            }

            var createMenuItem = function(text){
                var container = angular.element('<div>').addClass('column-subnavbar');
                var h2 = angular.element('<h2>').addClass('title');
                var link = angular.element('<a>');
                link.text(text);
                h2.append(link);
                container.append(h2);
                return container;
            }

            var createUserMenu = function(){
                var abacashSubnavbar = angular.element('<div>').addClass('abacash-user-subnavbar');
                var container = angular.element('<div>').addClass('container');
                var rowSubnavbar = angular.element('<div>').addClass('row-subnavbar');
                var logout = createMenuItem('Logout');
                var settings = createMenuItem('Instillinger');
                var changeSystem = createMenuItem('Bytt system');
                changeSystem.bind('mousedown', function(){
                    abacashSubnavbar.detach();
                    scope.clearSystem()
                });
                settings.bind('mousedown', function(){
                    abacashSubnavbar.detach();
                    scope.settings();
                });
                logout.bind('mousedown', function(){
                    abacashSubnavbar.detach();
                    scope.logout()
                });
                rowSubnavbar.append(logout);
                rowSubnavbar.append(settings);
                rowSubnavbar.append(changeSystem)
                container.append(rowSubnavbar);
                abacashSubnavbar.append(container)
                return abacashSubnavbar;
            }


        }
    }
});
