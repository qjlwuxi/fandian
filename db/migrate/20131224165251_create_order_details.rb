class CreateOrderDetails < ActiveRecord::Migration
  def change
    create_table :order_details do |t|
      t.integer :order_id, :null => false
      t.integer :food_id, :null => false
      t.string :name, :null => false
      t.integer :number, :null => false
      t.float :price, :null => false

      t.timestamps
    end
  end
end
