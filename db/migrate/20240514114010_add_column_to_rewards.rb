class AddColumnToRewards < ActiveRecord::Migration[7.1]
  def change
    add_column :rewards, :details, :string
  end
end
