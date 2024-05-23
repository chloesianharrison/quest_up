class Quest < ApplicationRecord
  belongs_to :user

  validates :name, :notes, presence: true
end
