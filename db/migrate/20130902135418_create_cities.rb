class CreateCities < ActiveRecord::Migration
  def self.up
    create_table :cities do |t|
      t.string :name, :null => false
      t.string :class_name, :null => false, :unique => true
      t.boolean :enable, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :cities
  end
end
