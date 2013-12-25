class CreatePrimaryBusinessesShops < ActiveRecord::Migration
  def change
    create_table :primary_businesses_shops, :id => false do |t|
      t.integer :primary_business_id
      t.integer :shop_id
    end
  end

end
