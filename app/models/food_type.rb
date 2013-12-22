class FoodType < ActiveRecord::Base
  belongs_to :shop
  has_many :foods
  
  def enable_foods
    foods = Food.find(:all, :conditions => ["food_type_id = :food_type_id and enable = 1", {:food_type_id => self.id}])
    if foods
      foods = foods.sort_by{|t| t.sort_id}
    end
    return foods
  end
end
