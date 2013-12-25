class City < ActiveRecord::Base
  attr_accessible :class_name, :enable, :name
  
  has_many :areas
end
