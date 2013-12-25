class CreateOrderLogs < ActiveRecord::Migration
  def change
    create_table :order_logs do |t|
      t.integer :order_id, :null => false
      t.string :content, :null => false

      t.timestamps
    end
  end
end
