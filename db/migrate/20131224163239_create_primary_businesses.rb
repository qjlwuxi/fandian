class CreatePrimaryBusinesses < ActiveRecord::Migration
  def change
    create_table :primary_businesses do |t|
      t.string :name
      t.boolean :enable

      t.timestamps
    end
  end
end
