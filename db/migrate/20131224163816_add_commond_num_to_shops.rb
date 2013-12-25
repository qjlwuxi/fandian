class AddCommondNumToShops < ActiveRecord::Migration
  def change
    add_column :shops, :order_commond_num, :integer, :default => 0
    add_column :shops, :supplier_remark, :text
    add_column :shops, :send_food_price, :integer, :default => 0
    add_column :shops, :location, :string
    add_column :shops, :send_food_rate, :string
  end
end
