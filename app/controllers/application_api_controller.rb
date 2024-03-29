class ApplicationApiController < ActionController::API
    include ActionController::MimeResponds
    include ApplicationApiHelper

    before_action :authorize_request

    # @param [String] token
    # @return [true, Object] The token verification and information
    def authorize_request
        token = nil

        token = request.headers['Authorization'].split('JWT ')[1] if request.headers['Authorization'].present?

        # No token provided
        return respond_with_status(401, 'Token not provided') unless token

        # Check if token is valid
        valid, payload = AuthToken.verify token

        return respond_with_status(401, 'Token invalid') unless valid

        # Looking for the user
        @current_user = User.find_by_id(payload['sub'])

        return respond_with_status(401, 'User not found') if @current_user.blank?

        return respond_with_status(401, 'User not active') unless @current_user.active
    end
end
