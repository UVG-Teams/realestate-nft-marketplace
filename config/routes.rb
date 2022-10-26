Rails.application.routes.draw do

    devise_for :users,
    :path => "",
    :path_names => {
        :sign_in  => "login",
        :sign_out => "logout",
        :sign_up  => "register",
    }

    resources :users

    namespace :api do
        namespace :users do
            resources :sessions
        end

        resources :users
    end

end
