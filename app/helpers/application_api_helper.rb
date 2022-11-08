module ApplicationApiHelper
    ANSI_RED = "\e[31m".freeze
    ANSI_WHITE = "\e[37m".freeze
    ANSI_RESET = "\e[0m".freeze

    # @param [int] status Status of the response
    # @param [Object] payload Information of the response
    # @return Object Information of response
    def respond_with_status(status = 200, payload = {})
        payload = { msg: payload } if payload.is_a?(String)

        case status
        when 200
            payload[:msg] = '200 - Ok' unless payload
        when 400
            payload[:msg] = '400 - Bad Request' unless payload[:msg]
        when 401
            payload[:msg] = '401 - Not Authorized' unless payload[:msg]
        when 404
            payload[:msg] = '404 - Not Found' unless payload[:msg]
        end

        render(status: status, content_type: 'application/json', json: payload.to_json)
    end

    def debug(*args)
        puts ANSI_RED
        puts '-' * 100
        args.each do |arg|
            puts arg
        end
        puts '-' * 100
        puts ANSI_RESET
    end
end
