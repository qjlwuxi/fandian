class CreateShops < ActiveRecord::Migration
  def self.up
    create_table :shops do |t|
      t.string :name, :null => false
      t.float :star
      t.string :logo_path
      t.boolean :enable, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :shops
  end
end
