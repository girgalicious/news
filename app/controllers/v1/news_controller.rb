class V1::NewsController < HomeController
    def index
        require 'news-api'

        # Init
        newsapi = News.new(ENV['NEWS_API_KEY'])

        render :json => newsapi.get_everything(q: 'Pokemon', language: 'en', sortBy: 'relevancy', page: 1)
    end
end
