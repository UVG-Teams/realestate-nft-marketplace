# frozen_string_literal: true

json.array! @user_wallets, partial: 'user_wallets/user_wallet', as: :user_wallet
