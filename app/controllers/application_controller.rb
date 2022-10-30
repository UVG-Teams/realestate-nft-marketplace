class ApplicationController < ActionController::Base
    before_action :authorization

    # Validate user authorization
    def authorization

        unless user_signed_in?

            # redirect with requested url, so user will be redirected after login
            redirect_to('/login', notice: 'Please Login to view that page!') and return unless ['/login'].include?(request.fullpath)

        end

        true

    end
end
