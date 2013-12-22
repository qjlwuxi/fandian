class AddOriginalPriceToFoods < ActiveRecord::Migration
  def self.up
    add_column :foods, :original_price, :float, :null => false
  end

  def self.down
    remove_column :foods, :original_price
  end
end
