Rails.application.routes.draw do

    devise_for :users,
    :path => '',
    :path_names => {
        :sign_in  => 'login',
        :sign_out => 'logout',
        :sign_up  => 'register',
    }

    resources :users, only: [:index]

    namespace :api do
        namespace :users do
            resources :sessions, only: [:create]
            resources :registration, only: [:create]
        end

        resources :users do
            scope module: :user do
                resources :wallets, only: []
            end

            member do
                get     :properties
                post    :wallet
            end
        end

        resources :properties
    end

end
