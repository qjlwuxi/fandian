class PersonalsController < ApplicationController
  def iAdd
    @area = Area.find(cookies[:areaID])
    render :layout => 'personals'
  end
end