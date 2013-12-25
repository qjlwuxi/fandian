class PrimaryBusinessesController < ApplicationController
  # GET /primary_businesses
  # GET /primary_businesses.json
  def index
    @primary_businesses = PrimaryBusiness.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @primary_businesses }
    end
  end

  # GET /primary_businesses/1
  # GET /primary_businesses/1.json
  def show
    @primary_business = PrimaryBusiness.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @primary_business }
    end
  end

  # GET /primary_businesses/new
  # GET /primary_businesses/new.json
  def new
    @primary_business = PrimaryBusiness.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @primary_business }
    end
  end

  # GET /primary_businesses/1/edit
  def edit
    @primary_business = PrimaryBusiness.find(params[:id])
  end

  # POST /primary_businesses
  # POST /primary_businesses.json
  def create
    @primary_business = PrimaryBusiness.new(params[:primary_business])

    respond_to do |format|
      if @primary_business.save
        format.html { redirect_to @primary_business, notice: 'Primary business was successfully created.' }
        format.json { render json: @primary_business, status: :created, location: @primary_business }
      else
        format.html { render action: "new" }
        format.json { render json: @primary_business.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /primary_businesses/1
  # PUT /primary_businesses/1.json
  def update
    @primary_business = PrimaryBusiness.find(params[:id])

    respond_to do |format|
      if @primary_business.update_attributes(params[:primary_business])
        format.html { redirect_to @primary_business, notice: 'Primary business was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @primary_business.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /primary_businesses/1
  # DELETE /primary_businesses/1.json
  def destroy
    @primary_business = PrimaryBusiness.find(params[:id])
    @primary_business.destroy

    respond_to do |format|
      format.html { redirect_to primary_businesses_url }
      format.json { head :no_content }
    end
  end
end
