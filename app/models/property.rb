class Property < ApplicationRecord
    belongs_to :user

    enum status: {
        listed: 'listed',
        not_listed: 'not_listed',
        reserved: 'reserved'
    }, _default: 'not_listed'

    enum category: {
        house: 'house',
        land: 'land',
        apartment: 'apartment',
        commercial: 'commercial',
        other: 'other'
    }

    validates :status, inclusion: { in: statuses.keys }
    validates :category, inclusion: { in: categories.keys }
end
