class Reward < ApplicationRecord
  belongs_to :user

  validates :name, :xp, presence:true
end
