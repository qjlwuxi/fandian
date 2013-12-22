module AreasHelper
  #检查餐厅是否营业
  def check_hour(shop)
    if shop.shop_hours != []
      status = false
      shop.shop_hours.each do |hour|
        if Time.now >= Time.parse(hour.start_time) and Time.now <= Time.parse(hour.end_time)
          status = true
          break
        end
      end
      return status
    else
      return true
    end
  end
end
