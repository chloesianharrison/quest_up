class CreateRewards < ActiveRecord::Migration[7.1]
  def change
    create_table :rewards do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.integer :xp
      t.boolean :earned
      t.boolean :completed

      t.timestamps
    end
  end
end
