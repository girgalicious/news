require File.expand_path('../boot', __FILE__)

require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'active_model/railtie'
require 'sprockets/railtie'
require 'rack/cors'
require 'rack/rewrite'
require 'rack-timeout'

if defined?(Bundler)
    # If you precompile assets before deploying to production, use this line
    Bundler.require(*Rails.groups(:assets => %w(development test)))
    # If you want your assets lazily compiled in production, use this line
    # Bundler.require(:default, :assets, Rails.env)
end

class NewsApplication < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # enable garbage collection instrumentation for NewRelic
    GC::Profiler.enable

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    config.time_zone = 'Eastern Time (US & Canada)'
    config.active_record.default_timezone = :local

    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = 'utf-8'

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    # Enable the asset pipeline
    config.assets.enabled = false

    # get rid of field_with_error
    config.action_view.field_error_proc = Proc.new { |html_tag, instance| html_tag.html_safe }

    config.middleware.use ActiveRecord::Migration::CheckPending
    config.middleware.use Rack::Deflater

    # Cross Domain Request
    config.middleware.insert_before ActionDispatch::Static, Rack::Cors do
        allow do
            origins '*'
            resource '*', :headers => :any, :methods => [:get, :post, :put, :delete, :options]
            resource '/assets/*', headers: :any, methods: [:get]
            resource '/fonts/*', headers: :any, methods: [:get]
        end
    end

    config.generators do |g|
        g.test_framework :rspec,
                         :fixtures => true,
                         :view_specs => false,
                         :helper_specs => false,
                         :routing_specs => true,
                         :controller_specs => true,
                         :request_specs => true
        g.fixture_replacement :factory_girl, :dir => 'spec/factories'
    end

    config.middleware.insert_before ActionDispatch::Static, Rack::Rewrite do
        rewrite %r{^(?!/sidekiq|\/v1/|\/api/).*}, '/', :not => %r{(.*\..*)}
    end

    # rails api
    config.api_only = true


    # config/application.rb
    config.exceptions_app = self.routes # a Rack Application
end
