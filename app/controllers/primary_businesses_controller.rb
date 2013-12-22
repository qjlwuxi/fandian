class PrimaryBusinessesController < ApplicationController
  # GET /primary_businesses
  # GET /primary_businesses.xml
  def index
    @primary_businesses = PrimaryBusiness.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @primary_businesses }
    end
  end

  # GET /primary_businesses/1
  # GET /primary_businesses/1.xml
  def show
    @primary_business = PrimaryBusiness.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @primary_business }
    end
  end

  # GET /primary_businesses/new
  # GET /primary_businesses/new.xml
  def new
    @primary_business = PrimaryBusiness.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @primary_business }
    end
  end

  # GET /primary_businesses/1/edit
  def edit
    @primary_business = PrimaryBusiness.find(params[:id])
  end

  # POST /primary_businesses
  # POST /primary_businesses.xml
  def create
    @primary_business = PrimaryBusiness.new(params[:primary_business])

    respond_to do |format|
      if @primary_business.save
        format.html { redirect_to(@primary_business, :notice => 'PrimaryBusiness was successfully created.') }
        format.xml  { render :xml => @primary_business, :status => :created, :location => @primary_business }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @primary_business.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /primary_businesses/1
  # PUT /primary_businesses/1.xml
  def update
    @primary_business = PrimaryBusiness.find(params[:id])

    respond_to do |format|
      if @primary_business.update_attributes(params[:primary_business])
        format.html { redirect_to(@primary_business, :notice => 'PrimaryBusiness was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @primary_business.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /primary_businesses/1
  # DELETE /primary_businesses/1.xml
  def destroy
    @primary_business = PrimaryBusiness.find(params[:id])
    @primary_business.destroy

    respond_to do |format|
      format.html { redirect_to(primary_businesses_url) }
      format.xml  { head :ok }
    end
  end
end
