class User < ActiveRecord::Base
  attr_accessible :mail, :nickname, :password
  
  has_many :orders
  has_many :user_contacts
end
