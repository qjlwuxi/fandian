class Shop < ActiveRecord::Base
  has_and_belongs_to_many :areas
  has_many :shop_hours
  has_and_belongs_to_many :primary_businesses
  has_many :food_types
  has_many :orders
  
  #检查餐厅是否营业
  def check_hour
    if self.shop_hours != []
      status = false
      self.shop_hours.each do |hour|
        if Time.now >= Time.parse(hour.start_time) and Time.now <= Time.parse(hour.end_time)
          status = true
          break
        end
      end
      return status
    else
      return true
    end
  end
  
  #获取餐厅对应启用的食品类型
  def enable_food_types
    food_types = FoodType.find(:all, :conditions => ["shop_id = :shop_id and enable = 1", {:shop_id => self.id}])
    if food_types
      food_types = food_types.sort_by{|t| t.sort_id}
    end
    return food_types
  end
end
