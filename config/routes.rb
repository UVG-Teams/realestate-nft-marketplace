Rails.application.routes.draw do

    devise_for :users,
    :path => "",
    :path_names => {
        :sign_in  => "login",
        :sign_out => "logout",
        :sign_up  => "register",
    }

    resources :users, only: [:index]

    namespace :api do
        namespace :users do
            resources :sessions
            resources :registration
        end

        resources :users do
            member do
                get :properties
            end
        end

        resources :properties
    end

end
