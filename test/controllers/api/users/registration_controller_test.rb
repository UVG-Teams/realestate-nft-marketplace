# frozen_string_literal: true

require 'test_helper'

class Api::Users::RegistrationControllerTest < ActionDispatch::IntegrationTest
    test 'should register with basic data' do
        post api_users_registration_index_path, params: {
            registration: {
                email: Faker::Internet.email,
                password: 'Password1',
                password_confirmation: 'Password1'
            }
        }

        assert_response :success
    end

    test 'should register with basic data and account' do
        post api_users_registration_index_path, params: {
            registration: {
                email: Faker::Internet.email,
                password: 'Password1',
                password_confirmation: 'Password1'
            },
            wallet: {
                account: Faker::Crypto.sha256
            }
        }

        assert_response :success
    end

    test 'should register with complete data' do
        post api_users_registration_index_path, params: {
            registration: {
                email: Faker::Internet.email,
                password: 'Password1',
                password_confirmation: 'Password1',
                first_name: 'Admin',
                last_name: '3',
                telephone: '+50212345678'
            }
        }

        assert_response :success
    end

    test 'should register with complete data and account' do
        post api_users_registration_index_path, params: {
            registration: {
                email: Faker::Internet.email,
                password: 'Password1',
                password_confirmation: 'Password1',
                first_name: 'Admin',
                last_name: '4',
                telephone: '+50212345678'
            },
            wallet: {
                account: Faker::Crypto.sha256
            }
        }

        assert_response :success
    end

    test 'should not register with existent email' do
        post api_users_registration_index_path, params: {
            registration: {
                email: 'admin@vesta.com',
                password: 'Password1',
                password_confirmation: 'Password1'
            }
        }

        assert_response 400
    end

    test 'should not register without email' do
        post api_users_registration_index_path, params: {
            registration: {
                password: 'Password1',
                password_confirmation: 'Password1'
            }
        }

        assert_response 400
    end

    test 'should not register without password' do
        post api_users_registration_index_path, params: {
            registration: {
                email: Faker::Internet.email
            }
        }

        assert_response 400
    end

    test 'should not register without matching passwords' do
        post api_users_registration_index_path, params: {
            registration: {
                email: Faker::Internet.email,
                password: 'Password1',
                password_confirmation: 'Password2'
            }
        }

        assert_response 400
    end
end
