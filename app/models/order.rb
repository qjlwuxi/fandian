class Order < ActiveRecord::Base
  attr_accessible :order_num, :original_price, :current_price, :phone, :address, :area_id, :shop_id, :altphone, :notes
  
  belongs_to :user
  belongs_to :area
  belongs_to :shop
  has_many :order_details
  has_many :order_logs
  
  #状态机
   state_machine :initial => :creating do
     
   end
  
  #检查订单是否合法，小于0表示不合法，合法返回nil
  def self.check_legal(area_id,user_id,address,phone,altPhone,cartInfo)
    return nil
  end
  
  #创建订单
  def self.create_order(area_id,user_id,address,phone,notes,altPhone,cartInfo)
    @order = Order.new
    @order.order_num = NumberManage.get_order_number
    @order.phone = phone
    @order.address = address
    @order.user_id = user_id
    @order.area_id = area_id
    @order.shop_id = cartInfo['SupID']
    @order.original_price = 15
    @order.current_price = cartInfo['totalPrice']
    @order.altphone = altPhone
    @order.notes = notes
    @order.save!
    cartInfo['FoodInfos'].each do |info|
      OrderDetail.create(:order_id => @order.id, :food_id => info['foodID'], :name => info['foodName'], :number => info['number'], :price => info['foodprice'])
    end
    return @order.id
  end
end
