# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

def generate_property_uuid
    uuid = SecureRandom.hex(20)

    # Check if the uuid is unique
    Property.find_by(nft_id: uuid) ? generate_property_uuid : uuid
end

puts 'Running seeders'

users_data = [{
    email: 'admin@vesta.com'
}, {
    email: 'frosal@vesta.com'
}, {
    email: 'lrivera@vesta.com'
}, {
    email: 'acastillo@vesta.com'
}, {
    email: 'mfuentes@vesta.com'
}]

users_data.each do |data|

    password = SecureRandom.hex(10)
    Debugger.debug data[:email], password

    admin_user = User.create_with(
        password: password,
        active: true
    ).find_or_create_by!(
        email: data[:email]
    )
end

User.all.each do |user|
    user.properties.create_with(
        finca: Faker::Number.number(digits: 4),
        folio: Faker::Number.number(digits: 4),
        libro: Faker::Number.number(digits: 4),
        location: Faker::Address.full_address,
        category: Property.categories.keys.sample,
        rooms: Faker::Number.number(digits: 1),
        bathrooms: Faker::Number.number(digits: 1)
    ).find_or_create_by!(
        nft_id: generate_property_uuid
    )
end

puts 'Finish seeders'
