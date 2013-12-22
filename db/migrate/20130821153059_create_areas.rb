class CreateAreas < ActiveRecord::Migration
  def self.up
    create_table :areas do |t|
      t.string :name, :null => false
      t.integer :city_id, :null => false
      t.boolean :enable, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :areas
  end
end
