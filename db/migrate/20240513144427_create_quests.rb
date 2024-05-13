class CreateQuests < ActiveRecord::Migration[7.1]
  def change
    create_table :quests do |t|
      t.string :name
      t.integer :xp
      t.string :notes
      t.date :due_date
      t.integer :fun_rating
      t.integer :difficulty_rating
      t.integer :consequence_level
      t.boolean :completed
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
