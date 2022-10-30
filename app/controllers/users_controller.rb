class UsersController < ApplicationController
    before_action :set_user, only: %i[show]

    # GET /users or /users.json
    def index
        @users = User.all
    end

    # GET /users/1 or /users/1.json
    def show; end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_user
        @user = User.find_by_id(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
        params.fetch(:user, {})
    end
end
