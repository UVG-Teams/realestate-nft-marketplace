class AlterUser1 < ActiveRecord::Migration[7.0]
    def change
        add_column :users, :first_name, :string
        add_column :users, :last_name, :string
        add_column :users, :telephone, :string
        add_column :users, :pid_number, :string # Personal ID Number
    end
end
