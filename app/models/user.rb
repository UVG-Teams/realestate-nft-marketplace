class User < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable, :rememberable, :validatable
    devise :database_authenticatable, :registerable, :recoverable
end
