class CreateOrderDetails < ActiveRecord::Migration
  def self.up
    create_table :order_details do |t|
      t.integer :order_id, :null => false
      t.integer :food_id, :null => false
      t.string :name, :null => false
      t.integer :number, :null => false
      t.float :price, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :order_details
  end
end
