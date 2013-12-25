class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name, :null => false
      t.string :class_name, :null => false, :unique => true
      t.boolean :enable, :null => false

      t.timestamps
    end
  end
end
