require 'rack-timeout'

class HomeController < ApplicationController
    include ActionController::Serialization

    before_action :verify_api_key

    rescue_from BadRequestException do |e|
        render :status => :bad_request, :json => { :message => e.message }
    end

    def routing_error
        render :status => :forbidden, :json => { :message => 'Invalid' }
    end

    def verify_api_key
    end

    def health_check
        render :status => 200
    end
end
