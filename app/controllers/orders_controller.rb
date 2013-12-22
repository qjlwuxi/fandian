class OrdersController < ApplicationController
  # GET /orders
  # GET /orders.xml
  def index
    @orders = Order.all
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @orders }
    end
  end
  
  # GET /orders/1
  # GET /orders/1.xml
  def show
    @order = Order.find(params[:id])
    
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @order }
    end
  end
  
  # GET /orders/new
  # GET /orders/new.xml
  def new
    @order = Order.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @order }
    end
  end
  
  # GET /orders/1/edit
  def edit
    @order = Order.find(params[:id])
  end
  
  # POST /orders
  # POST /orders.xml
  def create
    @order = Order.new(params[:order])
    
    respond_to do |format|
      if @order.save
        format.html { redirect_to(@order, :notice => 'Order was successfully created.') }
        format.xml  { render :xml => @order, :status => :created, :location => @order }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @order.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  # PUT /orders/1
  # PUT /orders/1.xml
  def update
    @order = Order.find(params[:id])
    
    respond_to do |format|
      if @order.update_attributes(params[:order])
        format.html { redirect_to(@order, :notice => 'Order was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @order.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  # DELETE /orders/1
  # DELETE /orders/1.xml
  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    
    respond_to do |format|
      format.html { redirect_to(orders_url) }
      format.xml  { head :ok }
    end
  end
  
  #订餐
  def checkout
    info = JSON.parse(cookies[:KcbCarInfo])
    @shop = Shop.find(info["SupID"])
    @foodInfos = info["FoodInfos"]
    @total_number = @foodInfos.sum{|x| x["number"].to_i}
    @total_price = @foodInfos.sum{|y| y["number"].to_i*y["foodprice"].to_f}
  end
  
  #下单
  def SendOrder
    begin
      ActiveRecord::Base.transaction do
        #区域areaID、用户userID、地址address、电话phone、备选电话altPhone、备注notes、订餐信息kcbcartInfo
        area_id = params[:areaID]
        user_id = params[:userID]
        address = params[:address]
        phone = params[:phone]
        altPhone = params[:altPhone]
        notes = params[:notes]
        cartInfo = JSON.parse(params[:kcbcartInfo])
        #检查订单是否合法，小于0表示不合法，否则返回nil
        @legal_data = Order.check_legal(area_id,user_id,address,phone,altPhone,cartInfo)
        #legal_data为nil，表示订单合法，创建订单
        if @legal_data == nil
          #创建订单
          @legal_data = Order.create_order(area_id,user_id,address,phone,notes,altPhone,cartInfo)
        end
      end
   rescue
     @legal_data = -12
   end
    render :text => @legal_data
  end
  
  #下单成功页面
  def success
    
  end
  
end
