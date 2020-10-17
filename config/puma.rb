# See https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server

workers Integer(ENV['WEB_CONCURRENCY'] || 1)
threads_count = Integer(ENV['MAX_THREADS'] || 5)
threads threads_count, threads_count

worker_timeout 20
worker_shutdown_timeout 8

preload_app!

rackup      DefaultRackup
port        ENV['PUMA_PORT'] || 3000
environment ENV['RACK_ENV'] || 'development'

# pidfile '/log/puma.pid'
# state_path '/log/puma.state'
# stdout_redirect '/log/error.log', '/log/access.log', true

on_worker_boot do
    # Valid on Rails up to 4.1 the initializer method of setting `pool` size
    ActiveSupport.on_load(:active_record) do
        config = ActiveRecord::Base.configurations[Rails.env] ||
                    Rails.application.config.database_configuration[Rails.env]
        config['pool'] = ENV['MAX_THREADS'] || 5
        ActiveRecord::Base.establish_connection(config)
    end
end
