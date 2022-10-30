# frozen_string_literal: true

require 'application_system_test_case'

class User::WalletsTest < ApplicationSystemTestCase
  setup do
    @user_wallet = user_wallets(:one)
  end

  test 'visiting the index' do
    visit user_wallets_url
    assert_selector 'h1', text: 'Wallets'
  end

  test 'should create wallet' do
    visit user_wallets_url
    click_on 'New wallet'

    click_on 'Create Wallet'

    assert_text 'Wallet was successfully created'
    click_on 'Back'
  end

  test 'should update Wallet' do
    visit user_wallet_url(@user_wallet)
    click_on 'Edit this wallet', match: :first

    click_on 'Update Wallet'

    assert_text 'Wallet was successfully updated'
    click_on 'Back'
  end

  test 'should destroy Wallet' do
    visit user_wallet_url(@user_wallet)
    click_on 'Destroy this wallet', match: :first

    assert_text 'Wallet was successfully destroyed'
  end
end
