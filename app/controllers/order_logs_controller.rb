class OrderLogsController < ApplicationController
  # GET /order_logs
  # GET /order_logs.json
  def index
    @order_logs = OrderLog.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @order_logs }
    end
  end

  # GET /order_logs/1
  # GET /order_logs/1.json
  def show
    @order_log = OrderLog.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @order_log }
    end
  end

  # GET /order_logs/new
  # GET /order_logs/new.json
  def new
    @order_log = OrderLog.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @order_log }
    end
  end

  # GET /order_logs/1/edit
  def edit
    @order_log = OrderLog.find(params[:id])
  end

  # POST /order_logs
  # POST /order_logs.json
  def create
    @order_log = OrderLog.new(params[:order_log])

    respond_to do |format|
      if @order_log.save
        format.html { redirect_to @order_log, notice: 'Order log was successfully created.' }
        format.json { render json: @order_log, status: :created, location: @order_log }
      else
        format.html { render action: "new" }
        format.json { render json: @order_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /order_logs/1
  # PUT /order_logs/1.json
  def update
    @order_log = OrderLog.find(params[:id])

    respond_to do |format|
      if @order_log.update_attributes(params[:order_log])
        format.html { redirect_to @order_log, notice: 'Order log was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @order_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /order_logs/1
  # DELETE /order_logs/1.json
  def destroy
    @order_log = OrderLog.find(params[:id])
    @order_log.destroy

    respond_to do |format|
      format.html { redirect_to order_logs_url }
      format.json { head :no_content }
    end
  end
end
