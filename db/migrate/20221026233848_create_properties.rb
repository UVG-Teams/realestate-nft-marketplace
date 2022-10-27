class CreateProperties < ActiveRecord::Migration[7.0]
    def change
        create_table :properties do |t|

            # Relevant
            t.string    :nft_id
            t.integer   :finca
            t.integer   :folio
            t.integer   :libro
            t.string    :location

            # Details
            t.integer   :rooms
            t.integer   :bathrooms

            t.timestamps
        end

        add_reference :properties, :user, foreign_key: true
    end
end
