class OrderDetail < ActiveRecord::Base
  attr_accessible :order_id, :food_id, :name, :number, :price
  
  belongs_to :order
  belongs_to :food
end
