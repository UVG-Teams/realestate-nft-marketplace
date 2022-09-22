class ApplicationController < ActionController::Base
    before_action :authorization


    # Validate user authorization
    def authorization

        unless user_signed_in?

            # redirect only if the path worth it
            if request.fullpath != "/users/sign_in"

                # redirect with requested url, so user will be redirected after login
                redirect_to("/users/sign_in", notice: "Please Login to view that page!") and return

            end

        end

        return true

    end
end
