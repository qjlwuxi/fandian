# encoding: utf-8
class ShopsController < ApplicationController
  # GET /shops
  # GET /shops.json
  def index
    @shops = Shop.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @shops }
    end
  end

  # GET /shops/1
  # GET /shops/1.json
  def show
    @shop = Shop.find(params[:id])
    if @shop
      @food_types = @shop.enable_food_types
    end

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @shop }
    end
  end

  # GET /shops/new
  # GET /shops/new.json
  def new
    @shop = Shop.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @shop }
    end
  end

  # GET /shops/1/edit
  def edit
    @shop = Shop.find(params[:id])
  end

  # POST /shops
  # POST /shops.json
  def create
    @shop = Shop.new(params[:shop])

    respond_to do |format|
      if @shop.save
        format.html { redirect_to @shop, notice: 'Shop was successfully created.' }
        format.json { render json: @shop, status: :created, location: @shop }
      else
        format.html { render action: "new" }
        format.json { render json: @shop.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /shops/1
  # PUT /shops/1.json
  def update
    @shop = Shop.find(params[:id])

    respond_to do |format|
      if @shop.update_attributes(params[:shop])
        format.html { redirect_to @shop, notice: 'Shop was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @shop.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shops/1
  # DELETE /shops/1.json
  def destroy
    @shop = Shop.find(params[:id])
    @shop.destroy

    respond_to do |format|
      format.html { redirect_to shops_url }
      format.json { head :no_content }
    end
  end

  def get_detail
    @shop = Shop.find(params[:shopID])
    detail = {}
    detail['SupplierID'] = @shop.id
    if @shop.check_hour
      detail['BusinessState'] = 1
    else
      detail['BusinessState'] = 0
    end
    detail['OrderCommentNum'] = @shop.order_commond_num
    detail['SupplierName'] = @shop.name
    detail['PrimaryBusiness'] = @shop.primary_businesses.collect{|p| p.name}.join(',')
    detail['SupplierRemark'] = @shop.supplier_remark
    detail['SendFoodPrice'] = @shop.send_food_price.to_s + "元" if @shop.send_food_price
    detail['Location'] = @shop.location
    detail['SupplierBusinessTime'] = @shop.shop_hours.collect{|s| s.start_time + "至" + s.end_time}.join(',')
    detail['SendFoodRate'] = @shop.send_food_rate
    render :json => detail.to_json
  end
end
