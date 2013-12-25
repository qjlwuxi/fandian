class UserContact < ActiveRecord::Base
  attr_accessible :user_id, :addr, :phone, :altphone, :is_default
  
  belongs_to :user
end
