class Food < ActiveRecord::Base
  belongs_to :food_type
  has_many :order_details
end
