class CreateFoods < ActiveRecord::Migration
  def self.up
    create_table :foods do |t|
      t.integer :food_type_id, :null => false
      t.string :name, :null => false
      t.boolean :enable, :null => false
      t.integer :sort_id, :null => false
      t.string :description
      t.float :price, :null => false
      t.integer :food_state, :null => false
      t.string :food_unit, :null => false
      t.integer :activity_state, :null => false
      t.boolean :is_new
      t.boolean :is_sign
      t.boolean :is_hot

      t.timestamps
    end
  end

  def self.down
    drop_table :foods
  end
end
