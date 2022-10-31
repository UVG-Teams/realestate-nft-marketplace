# frozen_string_literal: true

require 'test_helper'

class Api::Users::SessionsControllerTest < ActionDispatch::IntegrationTest
    test 'should login with email' do
        post api_users_sessions_path, params: {
            session: {
                email: 'admin@vesta.com',
                password: 'Password1'
            }
        }

        assert_response :success
    end

    test 'should login with account' do
        post api_users_sessions_path, params: {
            session: {
                account: '0x123admin@vesta.com',
                password: 'Password1'
            }
        }

        assert_response :success
    end

    test 'should not email login with wrong password' do
        post api_users_sessions_path, params: {
            session: {
                email: 'admin@vesta.com',
                password: 'Wrong_password1'
            }
        }

        assert_response 400
    end

    test 'should not account login with wrong password' do
        post api_users_sessions_path, params: {
            session: {
                account: '0x123admin@vesta.com',
                password: 'Wrong_password1'
            }
        }

        assert_response 400
    end

    test 'should login with wrong email' do
        post api_users_sessions_path, params: {
            session: {
                email: 'admin_not_found@vesta.com',
                password: 'Password1'
            }
        }

        assert_response 404
    end

    test 'should login with wrong account' do
        post api_users_sessions_path, params: {
            session: {
                account: '0x123adminadmin_not_found@vesta.com',
                password: 'Password1'
            }
        }

        assert_response 404
    end

    test 'should not login without params' do
        post api_users_sessions_path, params: {}

        assert_response 400
    end

    test 'should not login with empty params' do
        post api_users_sessions_path, params: {
            session: {
                account: '',
                password: ''
            }
        }

        assert_response 400
    end

    test 'should not login with nil params' do
        post api_users_sessions_path, params: {
            session: {
                account: nil,
                password: nil
            }
        }

        assert_response 400
    end
end
