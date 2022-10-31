# frozen_string_literal: true

require 'test_helper'

class Api::Users::SessionsControllerTest < ActionDispatch::IntegrationTest
    test 'should login with email' do
        post api_users_sessions_path, params: {
            email: 'admin@vesta.com',
            password: 'Password1'
        }
    end

    test 'should login with account' do
        post api_users_sessions_path, params: {
            account: '0x123admin@vesta.com',
            password: 'Password1'
        }
    end

    test 'should not email login with wrong password' do
        post api_users_sessions_path, params: {
            email: 'admin@vesta.com',
            password: 'Wrong_password1'
        }
    end

    test 'should not account login with wrong password' do
        post api_users_sessions_path, params: {
            account: '0x123admin@vesta.com',
            password: 'Wrong_password1'
        }
    end

    test 'should not login without params' do
        post api_users_sessions_path, params: {}
    end

    test 'should not login with empty params' do
        post api_users_sessions_path, params: {
            account: '',
            password: ''
        }
    end

    test 'should not login with nil params' do
        post api_users_sessions_path, params: {
            account: nil,
            password: nil
        }
    end
end
