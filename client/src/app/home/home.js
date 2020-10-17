(function() {
    "use strict";

    angular.module("news.home", []).
        config(["$stateProvider", homeConfig]).
        controller("HomeController", ["constants", "$http", HomeController]);

    function HomeController(constants, $http) {
        this.constants = constants;
        this.$http = $http;
        this.articles = [];
        this.mainArticle = {};
        this.refresh();
    }

    HomeController.prototype = {
        refresh: function() {
            this.$http.get("/v1/news").then(
                angular.bind(this, this.onRefreshSuccess),
                angular.bind(this, this.onRefreshError));
        },

        onRefreshSuccess: function(response) {
            this.articles = response.data;
            if (this.articles.length > 0) {
                this.mainArticle = this.articles[0];
            }
        },

        setMainArticle: function(article) {
            this.mainArticle = article;
        }
    };

    function homeConfig($stateProvider) {
        $stateProvider.
            state("root", {
                url: "^/",
                templateUrl: "home/home.tpl.html",
                controller: "HomeController",
                controllerAs: "ctrl"
            });
    }
}());