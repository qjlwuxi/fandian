class CreatePrimaryBusinessesShops < ActiveRecord::Migration
  def self.up
    create_table :primary_businesses_shops, :id => false do |t|
      t.integer :primary_business_id
      t.integer :shop_id
    end
  end

  def self.down
    drop_table :primary_businesses_shops
  end
end
