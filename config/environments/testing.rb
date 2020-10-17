NewsApplication.configure do
    # Settings specified here will take precedence over those in config/application.rb

    # Code is not reloaded between requests
    config.cache_classes = true

    # Full error reports are disabled and caching is turned on
    config.consider_all_requests_local       = false
    config.action_controller.perform_caching = true

    # make the public directory work
    config.public_file_server.enabled = true
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=31536000'
    }

    # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
    # config.force_ssl = true

    # See everything in the log (default is :info)
    config.log_level = :debug

    config.assets.enabled = false

    # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
    # the I18n.default_locale when a translation can not be found)
    config.i18n.fallbacks = true

    # Send deprecation notices to registered listeners
    config.active_support.deprecation = :notify

    # Log the query plan for queries taking more than this (works
    # with SQLite, MySQL, and PostgreSQL)
    # config.active_record.auto_explain_threshold_in_seconds = 0.5

    config.eager_load = false

    # https://blog.heroku.com/rails-asset-pipeline-vulnerability
    config.assets.compile = false
end
