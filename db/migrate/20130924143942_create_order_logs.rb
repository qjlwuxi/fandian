class CreateOrderLogs < ActiveRecord::Migration
  def self.up
    create_table :order_logs do |t|
      t.integer :order_id, :null => false
      t.string :content, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :order_logs
  end
end
