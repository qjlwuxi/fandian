class PrimaryBusiness < ActiveRecord::Base
  attr_accessible :enable, :name
  
  has_and_belongs_to_many :shops
end
