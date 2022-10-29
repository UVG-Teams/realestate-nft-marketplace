class User::WalletsController < ApplicationController
    before_action :set_user_wallet, only: %i[ show edit update destroy ]

    # GET /user/wallets or /user/wallets.json
    def index
        @user_wallets = User::Wallet.all
    end

    # GET /user/wallets/1 or /user/wallets/1.json
    def show
    end

    # GET /user/wallets/new
    def new
        @user_wallet = User::Wallet.new
    end

    # GET /user/wallets/1/edit
    def edit
    end

    # POST /user/wallets or /user/wallets.json
    def create
        @user_wallet = User::Wallet.new(user_wallet_params)

        respond_to do |format|
            if @user_wallet.save
                format.html { redirect_to user_wallet_url(@user_wallet), notice: "Wallet was successfully created." }
                format.json { render :show, status: :created, location: @user_wallet }
            else
                format.html { render :new, status: :unprocessable_entity }
                format.json { render json: @user_wallet.errors, status: :unprocessable_entity }
            end
        end
    end

    # PATCH/PUT /user/wallets/1 or /user/wallets/1.json
    def update
        respond_to do |format|
            if @user_wallet.update(user_wallet_params)
                format.html { redirect_to user_wallet_url(@user_wallet), notice: "Wallet was successfully updated." }
                format.json { render :show, status: :ok, location: @user_wallet }
            else
                format.html { render :edit, status: :unprocessable_entity }
                format.json { render json: @user_wallet.errors, status: :unprocessable_entity }
            end
        end
    end

    # DELETE /user/wallets/1 or /user/wallets/1.json
    def destroy
        @user_wallet.destroy

        respond_to do |format|
            format.html { redirect_to user_wallets_url, notice: "Wallet was successfully destroyed." }
            format.json { head :no_content }
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_wallet
        @user_wallet = User::Wallet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_wallet_params
        params.fetch(:user_wallet, {})
    end
end
