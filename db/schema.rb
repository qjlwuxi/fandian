# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131018140002) do

  create_table "areas", :force => true do |t|
    t.string   "name",       :null => false
    t.integer  "city_id",    :null => false
    t.boolean  "enable",     :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "areas_shops", :id => false, :force => true do |t|
    t.integer "area_id"
    t.integer "shop_id"
  end

  create_table "cities", :force => true do |t|
    t.string   "name",       :null => false
    t.string   "class_name", :null => false
    t.boolean  "enable",     :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "food_types", :force => true do |t|
    t.string   "name",       :null => false
    t.integer  "shop_id",    :null => false
    t.boolean  "enable",     :null => false
    t.integer  "sort_id",    :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "foods", :force => true do |t|
    t.integer  "food_type_id",   :null => false
    t.string   "name",           :null => false
    t.boolean  "enable",         :null => false
    t.integer  "sort_id",        :null => false
    t.string   "description"
    t.float    "price",          :null => false
    t.integer  "food_state",     :null => false
    t.string   "food_unit",      :null => false
    t.integer  "activity_state", :null => false
    t.boolean  "is_new"
    t.boolean  "is_sign"
    t.boolean  "is_hot"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "original_price", :null => false
  end

  create_table "number_manages", :force => true do |t|
    t.string   "order_type",                  :null => false
    t.integer  "number",                      :null => false
    t.integer  "lock_version", :default => 0, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "order_details", :force => true do |t|
    t.integer  "order_id",   :null => false
    t.integer  "food_id",    :null => false
    t.string   "name",       :null => false
    t.integer  "number",     :null => false
    t.float    "price",      :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "order_logs", :force => true do |t|
    t.integer  "order_id"
    t.string   "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "orders", :force => true do |t|
    t.string   "order_num",      :null => false
    t.float    "original_price", :null => false
    t.float    "current_price",  :null => false
    t.string   "phone",          :null => false
    t.string   "address",        :null => false
    t.string   "state",          :null => false
    t.integer  "user_id",        :null => false
    t.integer  "area_id",        :null => false
    t.integer  "shop_id",        :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "altphone"
    t.text     "notes"
  end

  create_table "primary_businesses", :force => true do |t|
    t.string   "name"
    t.boolean  "enable"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "primary_businesses_shops", :id => false, :force => true do |t|
    t.integer "primary_business_id"
    t.integer "shop_id"
  end

  create_table "shop_hours", :force => true do |t|
    t.integer  "shop_id",    :null => false
    t.string   "start_time", :null => false
    t.string   "end_time",   :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "shops", :force => true do |t|
    t.string   "name",                             :null => false
    t.string   "logo_path"
    t.float    "star"
    t.boolean  "enable",                           :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "order_commond_num", :default => 0
    t.text     "supplier_remark"
    t.integer  "send_food_price",   :default => 0
    t.string   "location"
    t.string   "send_food_rate"
  end

  create_table "user_contacts", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.string   "addr",       :null => false
    t.string   "phone",      :null => false
    t.string   "altphone"
    t.boolean  "is_default", :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "mail",       :null => false
    t.string   "password",   :null => false
    t.string   "nickname",   :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
