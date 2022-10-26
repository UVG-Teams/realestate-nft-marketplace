class Api::Users::RegistrationController < ApplicationApiController

    skip_before_action :authorize_request, only: :create

    def create

        current_user = nil

        # Looking for the user
        user = User.find_for_database_authentication(email: registration_params[:email])

        # User already exists
        return respond_with_status(400, "User already exists") unless user.blank?

        # Pasword mismatch
        return respond_with_status(400, "Pasword mismatch") if registration_params[:password] != registration_params[:password_confirmation]

        # Setting current_user
        current_user = User.new(registration_params)

        if current_user.save
            # Generate JWT
            auth_token = ::AuthToken.new(current_user)

            return respond_with_status(200, {
                token: auth_token.token
            })
        else
            return respond_with_status(400, "Try again later")
        end

    end

    private

    def registration_params
        params.fetch(:registration, {}).permit(:email, :password, :password_confirmation)
    end

end
