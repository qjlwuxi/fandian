class CreatePrimaryBusinesses < ActiveRecord::Migration
  def self.up
    create_table :primary_businesses do |t|
      t.string :name
      t.boolean :enable

      t.timestamps
    end
  end

  def self.down
    drop_table :primary_businesses
  end
end
