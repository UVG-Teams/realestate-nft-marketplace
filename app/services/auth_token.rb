require 'jwt'
# Docs: https://github.com/jwt/ruby-jwt

class AuthToken

    attr_accessor :token
    @@algorithm = "RS256"

    def initialize current_user, custom_payload = {}
        @current_user = current_user
        @custom_payload = custom_payload

        generate()
    end

    def generate
        private_key_path = Rails.application.credentials.dig(:rsa, :private_key)
        
        private_key_file = File.open(private_key_path)

        private_key_data = private_key_file.read

        private_key = OpenSSL::PKey::RSA.new(private_key_data)


        # Setting the payload of the token
        payload = {
            **@custom_payload,
            sub: @current_user.id,
            # exp: 24.hours.from_now.to_i,
            exp: 5.minutes.from_now.to_i,
        }

        self.token = JWT.encode payload, private_key, @@algorithm

    end

    def self.verify token
        public_key_path = Rails.application.credentials.dig(:rsa, :public_key)

        public_key_file = File.open(public_key_path)

        public_key_data = public_key_file.read

        public_key = OpenSSL::PKey::RSA.new(public_key_data)

        begin
            decoded_token = JWT.decode token, public_key, true, { algorithm: @@algorithm }
        rescue => exception
            Debugger.debug exception
            return false, nil
        end

        # Decoding parts of the token
        payload = decoded_token[0]
        header = decoded_token[1]

        # Check if the algorithm is correct
        return false, nil if header["alg"] != @@algorithm

        # Check if token is expired
        return false, nil if 0.seconds.from_now.to_i > payload["exp"].to_i

        return true, payload
    end

    def self.refresh token
        valid, payload = self.verify(token)

        return nil unless valid

        current_user = User.find_by_id(payload["sub"])
        custom_payload = payload.except("sub", "exp")

        self.new(current_user, custom_payload)
    end

    def self.generate_rsa
        rsa_private = OpenSSL::PKey::RSA.generate 2048
        rsa_public = rsa_private.public_key

        Debugger.debug rsa_private
        Debugger.debug rsa_public
    end

end
