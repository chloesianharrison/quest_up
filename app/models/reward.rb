class Reward < ApplicationRecord
  belongs_to :user

  validates :name, :xp, :details, presence: true
end
