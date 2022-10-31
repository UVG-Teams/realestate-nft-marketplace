class User < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable, :rememberable, :validatable
    devise :database_authenticatable, :registerable, :recoverable

    has_many :wallets
    has_many :properties
    has_one_attached :avatar do |attachable|
        attachable.variant :thumb, resize_to_limit: [150, 150]
    end
end
