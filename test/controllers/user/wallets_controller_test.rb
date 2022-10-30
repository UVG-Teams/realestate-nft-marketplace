# frozen_string_literal: true

require 'test_helper'

class User::WalletsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_wallet = user_wallets(:one)
  end

=begin
  test 'should get new' do
    get new_user_wallet_url
    assert_response :success
  end

  test 'should create user_wallet' do
    assert_difference('User::Wallet.count') do
      post user_wallets_url, params: { user_wallet: {} }
    end

    assert_redirected_to user_wallet_url(User::Wallet.last)
  end

  test 'should show user_wallet' do
    get user_wallet_url(@user_wallet)
    assert_response :success
  end

  test 'should get edit' do
    get edit_user_wallet_url(@user_wallet)
    assert_response :success
  end

  test 'should update user_wallet' do
    patch user_wallet_url(@user_wallet), params: { user_wallet: {} }
    assert_redirected_to user_wallet_url(@user_wallet)
  end

  test 'should destroy user_wallet' do
    assert_difference('User::Wallet.count', -1) do
      delete user_wallet_url(@user_wallet)
    end

    assert_redirected_to user_wallets_url
  end
=end
end
