NewsApplication.routes.draw do
    namespace :v1, :defaults => { format: :json } do
        resources :news, :only => [:index]
    end

    match '*a', :to => 'home#routing_error', :via => [:get, :post]

    root 'home#health_check'
end
