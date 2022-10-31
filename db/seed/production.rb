# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

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

    User.create_with(
        password: password,
        active: true
    ).find_or_create_by!(
        email: data[:email]
    )
end