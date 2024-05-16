class AddDefaultToQuests < ActiveRecord::Migration[7.1]
  def change
    change_column_default :quests, :completed, from: nil, to: false
    change_column_default :quests, :xp, from: 0, to: 10
  end
end
