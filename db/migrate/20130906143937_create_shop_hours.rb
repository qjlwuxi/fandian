class CreateShopHours < ActiveRecord::Migration
  def self.up
    create_table :shop_hours do |t|
      t.integer :shop_id, :null => false
      t.string :start_time, :null => false
      t.string :end_time, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :shop_hours
  end
end
