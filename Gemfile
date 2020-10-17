source 'https://rubygems.org'
ruby '2.3.8'

# gems required to boot the app
gem 'actionpack', '5.0.6'
gem 'active_model_serializers', '0.10.9'
gem 'activerecord', '5.0.6'
gem 'news-api'
gem 'pg', '0.19.0'
gem 'rack-cors', '0.4.1', :require => 'rack/cors' # will be used to support mobile
gem 'rack-rewrite', '1.5.1' # A rack middleware for enforcing rewrite rules. In many cases you can get away with rack-rewrite instead of writing Apache mod_rewrite rules.
gem 'rack-timeout', '0.4.2'
gem 'rails', '5.0.6'

gem 'bootsnap', '1.3.1', require: false # speeds up booting of application

group :development, :production, :staging do
    gem 'puma', '3.6.2'
end

group :development do
    gem 'foreman', '0.84.0'
    gem 'guard', '2.16.2'
    gem 'guard-rubocop', '1.3.0'
end

group :test do
    gem 'database_cleaner', '1.6.1'
    gem 'hashdiff', '0.3.7'
    gem 'rails-controller-testing', '1.0.2'
    gem 'rspec-benchmark', '0.3.0'
    gem 'rspec-rails', '3.6.1'
    gem 'rspec-sidekiq', '3.0.3'
    gem 'rubocop', '0.78.0', require: false
    gem 'rubocop-performance', '1.5.2', require: false
    gem 'rubocop-rails', '2.5.0', require: false
    gem 'rubocop-rspec', '1.38.1'
    gem 'shoulda-matchers', '3.1.2'
    gem 'simplecov', '0.15.1'
    gem 'webmock', '2.3.2'
end

group :test, :development, :staging do
    gem 'dotenv-rails', '2.2.1'
    gem 'thor', '0.19.4', :require => false # to get rid of this warning -> Expected string default value for '--serializer'; got true (boolean)
end
