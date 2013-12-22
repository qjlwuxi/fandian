class AddAltphoneAndNotesToOrders < ActiveRecord::Migration
  def self.up
    add_column :orders, :altphone, :string
    add_column :orders, :notes, :text
  end

  def self.down
    remove_column :orders, :notes
    remove_column :orders, :altphone
  end
end
