class ShopHour < ActiveRecord::Base
  attr_accessible :end_time, :shop_id, :start_time
  
  belongs_to :shop
end
