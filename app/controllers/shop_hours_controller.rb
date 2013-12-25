class ShopHoursController < ApplicationController
  # GET /shop_hours
  # GET /shop_hours.json
  def index
    @shop_hours = ShopHour.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @shop_hours }
    end
  end

  # GET /shop_hours/1
  # GET /shop_hours/1.json
  def show
    @shop_hour = ShopHour.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @shop_hour }
    end
  end

  # GET /shop_hours/new
  # GET /shop_hours/new.json
  def new
    @shop_hour = ShopHour.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @shop_hour }
    end
  end

  # GET /shop_hours/1/edit
  def edit
    @shop_hour = ShopHour.find(params[:id])
  end

  # POST /shop_hours
  # POST /shop_hours.json
  def create
    @shop_hour = ShopHour.new(params[:shop_hour])

    respond_to do |format|
      if @shop_hour.save
        format.html { redirect_to @shop_hour, notice: 'Shop hour was successfully created.' }
        format.json { render json: @shop_hour, status: :created, location: @shop_hour }
      else
        format.html { render action: "new" }
        format.json { render json: @shop_hour.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /shop_hours/1
  # PUT /shop_hours/1.json
  def update
    @shop_hour = ShopHour.find(params[:id])

    respond_to do |format|
      if @shop_hour.update_attributes(params[:shop_hour])
        format.html { redirect_to @shop_hour, notice: 'Shop hour was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @shop_hour.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shop_hours/1
  # DELETE /shop_hours/1.json
  def destroy
    @shop_hour = ShopHour.find(params[:id])
    @shop_hour.destroy

    respond_to do |format|
      format.html { redirect_to shop_hours_url }
      format.json { head :no_content }
    end
  end
end
