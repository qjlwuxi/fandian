class NumberManage < ActiveRecord::Base
  #生成订单的单号
  def self.get_order_number
    number_manage = NumberManage.first(:conditions => ["order_type = 'Order'"])
    number = number_manage.number
    number_manage.update_attribute(:number, number + 1)
    order_number = Time.now.strftime("%Y%m%d").to_s + sprintf("%05d",(number + 1))
    return order_number
  end
end
