class CreateProperties < ActiveRecord::Migration[7.0]
    def change
        create_table :properties do |t|

            # Relevant
            t.bigint    :nft_id
            t.integer   :finca
            t.integer   :libro
            t.integer   :folio
            t.string    :location

            # Details
            t.integer   :rooms
            t.integer   :bathrooms

            t.timestamps
        end

        add_reference :properties, :user, foreign_key: true
    end
end
