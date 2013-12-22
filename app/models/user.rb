class User < ActiveRecord::Base
  has_many :orders
  has_many :user_contacts
end
