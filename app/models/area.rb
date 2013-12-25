class Area < ActiveRecord::Base
  attr_accessible :city_id, :enable, :name
  
  belongs_to :city
  has_and_belongs_to_many :shops
  has_many :orders
end
