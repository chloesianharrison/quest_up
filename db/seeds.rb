# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'faker'

puts "Cleaning users..."
User.destroy_all
puts "Cleaning quests..."
Quest.destroy_all
puts "Cleaning rewards..."
Reward.destroy_all

puts 'Creating new database...'

3.times do
  user = User.create(
    email: Faker::Internet.email,
    username: Faker::Internet.username,
    password: "123456",
    xp: Faker::Number.within(range: 10..120)
  )
  puts 'User created.'

  3.times do
    user.quests.create(
      name: Faker::Hobby.activity,
      xp: Faker::Number.within(range: 10..80),
      notes: Faker::Lorem.paragraph(sentence_count: 2),
      due_date: Faker::Date.between(from: '2024-05-23', to: '2026-12-31'),
      fun_rating: Faker::Number.within(range: 1..10),
      difficulty_rating: Faker::Number.within(range: 1..10),
      consequence_level: Faker::Number.within(range: 1..10),
      completed: Faker::Boolean.boolean
    )
    puts 'Quest created.'

    user.rewards.create(
      name: Faker::Hobby.activity,
      xp: Faker::Number.number(digits: 3),
      details: Faker::Lorem.paragraph(sentence_count: 2),
      completed: Faker::Boolean.boolean
    )
    puts 'Reward created.'
  end
end
puts 'Database created.'
