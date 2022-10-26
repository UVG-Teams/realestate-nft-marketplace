class CreateProperties < ActiveRecord::Migration[7.0]
    def change
        create_table :properties do |t|

            t.timestamps
        end

        add_reference :properties, :user, foreign_key: true
    end
end
