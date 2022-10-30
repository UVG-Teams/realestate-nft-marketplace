class Api::UsersController < ApplicationApiController
    before_action :set_user, only: %i[show edit update destroy properties]

    # GET /users or /users.json
    def index
        @users = User.all
        respond_with_status(200, @users)
    end

    # GET /users/1 or /users/1.json
    def show
        respond_with_status(200, @user)
    end

    # PATCH/PUT /users/1 or /users/1.json
    def update
        return respond_with_status(401) if @user != @current_user

        if @user.update(user_params)
            respond_with_status(200, 'User was successfully updated.')
        else
            respond_with_status(400, @user.errors)
        end
    end

    # DELETE /users/1 or /users/1.json
    def destroy
        return respond_with_status(401) if @user != @current_user

        @user.destroy

        respond_with_status(200, 'User was successfully destroyed.')
    end

    # ====================================================================================================
    # Custom methods
    # ====================================================================================================

    def properties
        user_properties = @user.properties.all
        respond_with_status(200, user_properties)
    end

    def wallet
        return respond_with_status(400) if wallet_params[:account].blank?

        # Look account in all registered
        wallet = User::Wallet.find_by(account: wallet_params[:account])

        # Account already registered
        return respond_with_status(400, 'Account already registered by other user') if wallet

        wallet = @current_user.wallets.new(wallet_params)

        if wallet.save
            respond_with_status(200, 'Wallet was successfully created.')
        else
            respond_with_status(400, wallet.errors)
        end
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_user
        @user = User.find_by_id(params[:id])
        return respond_with_status(404, 'User not found.') if @user.blank?
    end

    # Only allow a list of trusted parameters through.
    def user_params
        params.fetch(:user, {})
    end

    def wallet_params
        params.fetch(:wallet, {}).permit(:account)
    end
end
