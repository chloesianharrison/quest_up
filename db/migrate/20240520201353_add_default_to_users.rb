class AddDefaultToUsers < ActiveRecord::Migration[7.1]
  def change
    change_column_default :users, :xp, from: nil, to: 0
  end
end
