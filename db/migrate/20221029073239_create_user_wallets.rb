class CreateUserWallets < ActiveRecord::Migration[7.0]
    def change
        create_table :user_wallets do |t|
            t.string :account

            t.timestamps
        end

        add_reference :user_wallets, :user, foreign_key: true
    end
end
