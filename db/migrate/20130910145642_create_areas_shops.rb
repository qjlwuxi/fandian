class CreateAreasShops < ActiveRecord::Migration
  def self.up
    create_table :areas_shops, :id => false do |t|
      t.integer :area_id
      t.integer :shop_id
    end
  end

  def self.down
    drop_table :areas_shops
  end
end
