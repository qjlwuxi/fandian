class CreateAreasShops < ActiveRecord::Migration
  def change
    create_table :areas_shops, :id => false do |t|
      t.integer :area_id
      t.integer :shop_id
    end
  end

end
