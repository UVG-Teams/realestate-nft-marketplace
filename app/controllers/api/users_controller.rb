class Api::UsersController < ApplicationApiController
    before_action :set_user, only: %i[show update destroy properties upload_avatar remove_wallet]
    before_action :check_ownership, only: %i[update destroy upload_avatar remove_wallet]

    # GET /users or /users.json
    # @return [Object] All users information
    def index
        @users = User.all
        respond_with_status(200, @users)
    end

    # GET /users/1 or /users/1.json
    # @param [int] id The id of the user to show
    # @return [Object] The user information
    def show
        respond_with_status(200, @user.slice(
            :id,
            :email,
            :active,
            :created_at,
            :updated_at,
            :first_name,
            :last_name,
            :telephone,
            :pid_number
        ).merge(
            avatar: @user.avatar.attached? ? url_for(@user.avatar) : nil,
            wallets: @user.wallets
        ))
    end

    # PATCH/PUT /users/1 or /users/1.json
    # @param [int] id The user id
    # @param [String] first_name
    # @param [String] last_name
    # @param [String] email
    # @param [String] password
    # @return [Object] The updated user
    def update
        if @user.update(user_params)
            respond_with_status(200, 'User was successfully updated.')
        else
            respond_with_status(400, @user.errors)
        end
    end

    # DELETE /users/1 or /users/1.json
    # @param [int] id The users id to delete
    # @return [nil, error] Nil if user is deleted
    def destroy
        @user.destroy

        respond_with_status(200, 'User was successfully destroyed.')
    end

    # ====================================================================================================
    # Custom methods
    # ====================================================================================================

    # @param [int] id The users id
    # @param Avatar The user avatar
    # @return [true] True if upload successful
    def upload_avatar
        # Remove the previous if exists
        @current_user.avatar.purge if @current_user.avatar.attached?

        # Attach the new file
        @current_user.avatar.attach(params[:avatar])

        respond_with_status(200, {
            avatar_url: url_for(@current_user.avatar)
        })
    end

    # @param [int] id The users id
    # @return [Object] The properties related to the user
    def properties
        user_properties = @user.properties.all
        respond_with_status(200, user_properties)
    end

    # @param [int] id The users id
    # @return [String] The users wallet
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

    # @param [int] id The users id
    # @return [nil] If wallet is removed
    def remove_wallet
        return respond_with_status(400) if wallet_params[:account].blank?

        wallet = @user.wallets.find_by(account: wallet_params[:account])

        return respond_with_status(404) unless wallet

        if wallet.destroy
            respond_with_status(200, 'Wallet was successfully destroy.')
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

    def check_ownership
        return respond_with_status(401) if @current_user != @user
    end
end
