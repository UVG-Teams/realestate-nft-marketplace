class Api::Users::RegistrationController < ApplicationApiController
    skip_before_action :authorize_request, only: :create

    def create
        @current_user = nil

        return respond_with_status(400, 'Email required') if registration_params[:email].blank?
        return respond_with_status(400, 'Password required') if registration_params[:password].blank?
        return respond_with_status(400, 'Password confirmation required') if registration_params[:password_confirmation].blank?

        # Looking for the user
        user = User.find_for_database_authentication(email: registration_params[:email])

        # User already exists
        return respond_with_status(400, 'User already exists') unless user.blank?

        # Password complexity mismatched
        return respond_with_status(400, 'Password must contain lower case, upper case and number') if registration_params[:params].blank? && !registration_params[:password].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

        # Pasword mismatch
        return respond_with_status(400, 'Pasword mismatch') if registration_params[:password] != registration_params[:password_confirmation]

        # Setting @current_user
        @current_user = User.new(registration_params)
        @current_user.active = true

        if @current_user.save

            if wallet_params[:account]

                # Look account in all registered
                wallet = User::Wallet.find_by(account: wallet_params[:account])

                # Account already registered
                return respond_with_status(400, 'Account already registered by other user') if wallet

                # Registering account for the current_user
                @current_user.wallets.create({
                    account: wallet_params[:account]
                })

            end

            # Generate JWT
            auth_token = ::AuthToken.new(@current_user)

            respond_with_status(200, {
                token: auth_token.token
            })

        else
            respond_with_status(400, 'Try again later')
        end
    end

    private

    def registration_params
        params.fetch(:registration, {}).permit(
            :email,
            :password,
            :password_confirmation,
            :first_name,
            :last_name,
            :telephone
        )
    end

    def wallet_params
        params.fetch(:wallet, {}).permit(:account)
    end
end
