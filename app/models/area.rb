class Area < ActiveRecord::Base
  belongs_to :city
  has_and_belongs_to_many :shops
  has_many :orders
end
