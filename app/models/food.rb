class Food < ActiveRecord::Base
  attr_accessible :food_type_id, :name, :enable, :sort_id, :description, :price, :food_state, :food_unit, :activity_state, :is_new, :is_sign, :is_hot, :original_price
  
  belongs_to :food_type
  has_many :order_details
end
