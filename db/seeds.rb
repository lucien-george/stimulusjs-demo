# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "cleaning up database..."
Post.destroy_all

puts "seeding 1000 posts..."

1000.times do |i|
  count = rand(5..20)
  Post.create! title: Faker::Lorem.sentence, content: Faker::Lorem.paragraph(sentence_count: 20)
  puts "Post #{i + 1} created"
end
