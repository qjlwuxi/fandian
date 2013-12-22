class CreateNumberManages < ActiveRecord::Migration
  def self.up
    create_table :number_manages do |t|
      t.string :order_type, :null => false
      t.integer :number, :null => false
      t.integer :lock_version, :null => false, :default => 0

      t.timestamps
    end
    
    NumberManage.create(:order_type => "Order", :number => 0)
  end

  def self.down
    drop_table :number_manages
  end
end
