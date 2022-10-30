class ApplicationApiController < ActionController::API
    include ActionController::MimeResponds
    include ApplicationApiHelper

    before_action :authorize_request

    def authorize_request

        token = nil

        if request.headers['Authorization'].present?
            token = request.headers['Authorization'].split('JWT ')[1]
        end

        # No token provided
        return respond_with_status(401) unless token

        # Check if token is valid
        valid, payload = AuthToken.verify token

        return respond_with_status(401) unless valid

        # Looking for the user
        @current_user = User.find_by_id(payload['sub'])

        return respond_with_status(401) if @current_user.blank?

        return respond_with_status(401, 'Your user is not active') unless @current_user.active

    end
end
