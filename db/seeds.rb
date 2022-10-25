# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).


puts "Running seeders"

User.create_with(
    password: "admin"
).find_or_create_by(
    email: "hello@admin.com",
)

puts "Finish seeders"
