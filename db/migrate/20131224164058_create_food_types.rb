class CreateFoodTypes < ActiveRecord::Migration
  def change
    create_table :food_types do |t|
      t.string :name, :null => false
      t.integer :shop_id, :null => false
      t.boolean :enable, :null => false
      t.integer :sort_id, :null => false

      t.timestamps
    end
  end
end
