class Api::Users::SessionsController < ApplicationApiController

    skip_before_action :authorize_request, only: :create

    def create

        if session_params[:account]

            wallet = User::Wallet.find_by(account: session_params[:account])

            return respond_with_status(404, 'Wallet account not found') unless wallet

            # Setting @current_user
            @current_user = wallet.user

        else

            # Looking for the user
            user = User.find_for_database_authentication(email: session_params[:email])

            # User not found
            return respond_with_status(404, 'User not found') if user.blank?

            # Setting @current_user
            @current_user = user

        end

        # Validate password
        return respond_with_status(400, 'Wrong password') unless @current_user.valid_password?(session_params[:password])

        # Generate JWT
        auth_token = ::AuthToken.new(@current_user, {
            email: @current_user.email,
            first_name: @current_user.first_name,
            last_name: @current_user.last_name,
            telephone: @current_user.telephone
        })

        respond_with_status(200, {
            token: auth_token.token
        })

    end

    private

    def session_params
        params.fetch(:session, {}).permit(:email, :password, :account)
    end

end
