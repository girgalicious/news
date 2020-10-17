(function() {
    "use strict";
    angular.
        module("news", [
            "angular.filter",
            "ngMessages",
            "ngAnimate",
            "selectize",
            "templates-app",
            "templates-common",
            "textAngular",
            "ui.router",
            "ui.bootstrap",
            "ui.select",
            "news.home"
        ]).
        config([
            "$urlMatcherFactoryProvider",
            "$stateProvider",
            "$urlRouterProvider",
            "$httpProvider",
            "uiSelectConfig",
            "$provide",
            "$locationProvider",
            function(
                $urlMatcherFactoryProvider,
                $stateProvider,
                $urlRouterProvider,
                $httpProvider,
                uiSelectConfig,
                $provide,
                $locationProvider) {

                $urlMatcherFactoryProvider.caseInsensitive(true);

                // unknown states go to the root
                $urlRouterProvider.otherwise("/");
                // use the HTML5 History API
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: true,
                    rewriteLinks: true
                });

                // set the ui-select theme
                uiSelectConfig.theme = "bootstrap";
                uiSelectConfig.resetSearchInput = true;
                uiSelectConfig.appendToBody = true;
            }
        ]);
}());