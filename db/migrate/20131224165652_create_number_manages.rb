class CreateNumberManages < ActiveRecord::Migration
  def change
    create_table :number_manages do |t|
      t.string :order_type, :null => false
      t.integer :number, :null => false
      t.integer :lock_version, :null => false, :default => 0

      t.timestamps
    end
  end
end
