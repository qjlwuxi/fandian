class CreateShopHours < ActiveRecord::Migration
  def change
    create_table :shop_hours do |t|
      t.integer :shop_id, :null => false
      t.string :start_time, :null => false
      t.string :end_time, :null => false

      t.timestamps
    end
  end
end
