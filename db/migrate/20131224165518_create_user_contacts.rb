class CreateUserContacts < ActiveRecord::Migration
  def change
    create_table :user_contacts do |t|
      t.integer :user_id, :limit => 20, :null => false
      t.string :addr, :null => false
      t.string :phone, :null => false
      t.string :altphone
      t.boolean :is_default, :null => false


      t.timestamps
    end
  end
end
