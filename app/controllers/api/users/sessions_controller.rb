class Api::Users::SessionsController < ApplicationApiController

    skip_before_action :authorize_request, only: :create

    def create

        # Looking for the user
        user = User.find_for_database_authentication(email: session_params[:email])

        # User not found
        return respond_with_status(404) if user.blank?

        # Setting @current_user
        @current_user = user

        # Wrong password
        return respond_with_status(400, "Wrong password") unless @current_user.valid_password?(session_params[:password])

        # Generate JWT
        auth_token = ::AuthToken.new(@current_user)

        respond_with_status(200, {
            token: auth_token.token
        })

    end

    private

    def session_params
        params.fetch(:session, {}).permit(:email, :password)
    end

end
