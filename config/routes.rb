Rails.application.routes.draw do
    devise_for :users,
    path: '',
    path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        sign_up: 'register'
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
                delete  :remove_wallet
                post    :upload_avatar
            end
        end

        resources :properties do
            collection do
                post    :sync
            end

            member do
                post    :upload_files
                get     :retrieve_files
            end
        end
    end
end
