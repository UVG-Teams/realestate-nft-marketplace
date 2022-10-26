class ApplicationApiController < ActionController::API
    include ActionController::MimeResponds
    include ApplicationApiHelper

    before_action :authorize_request

    def authorize_request

    end

end
