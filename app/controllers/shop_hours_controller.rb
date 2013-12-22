class ShopHoursController < ApplicationController
  # GET /shop_hours
  # GET /shop_hours.xml
  def index
    @shop_hours = ShopHour.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @shop_hours }
    end
  end

  # GET /shop_hours/1
  # GET /shop_hours/1.xml
  def show
    @shop_hour = ShopHour.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @shop_hour }
    end
  end

  # GET /shop_hours/new
  # GET /shop_hours/new.xml
  def new
    @shop_hour = ShopHour.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @shop_hour }
    end
  end

  # GET /shop_hours/1/edit
  def edit
    @shop_hour = ShopHour.find(params[:id])
  end

  # POST /shop_hours
  # POST /shop_hours.xml
  def create
    @shop_hour = ShopHour.new(params[:shop_hour])

    respond_to do |format|
      if @shop_hour.save
        format.html { redirect_to(@shop_hour, :notice => 'ShopHour was successfully created.') }
        format.xml  { render :xml => @shop_hour, :status => :created, :location => @shop_hour }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @shop_hour.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /shop_hours/1
  # PUT /shop_hours/1.xml
  def update
    @shop_hour = ShopHour.find(params[:id])

    respond_to do |format|
      if @shop_hour.update_attributes(params[:shop_hour])
        format.html { redirect_to(@shop_hour, :notice => 'ShopHour was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @shop_hour.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /shop_hours/1
  # DELETE /shop_hours/1.xml
  def destroy
    @shop_hour = ShopHour.find(params[:id])
    @shop_hour.destroy

    respond_to do |format|
      format.html { redirect_to(shop_hours_url) }
      format.xml  { head :ok }
    end
  end
end
