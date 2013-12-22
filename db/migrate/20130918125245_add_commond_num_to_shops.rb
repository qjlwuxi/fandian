class AddCommondNumToShops < ActiveRecord::Migration
  def self.up
    add_column :shops, :order_commond_num, :integer, :default => 0
    add_column :shops, :supplier_remark, :text
    add_column :shops, :send_food_price, :integer, :default => 0
    add_column :shops, :location, :string
    add_column :shops, :send_food_rate, :string
  end

  def self.down
    remove_column :shops, :order_commond_num
    remove_column :shops, :supplier_remark
    remove_column :shops, :send_food_price
    remove_column :shops, :location
    remove_column :shops, :send_food_rate
  end
end
