class HomeController < ActionController::Base
  def index
    @cities = City.all
  end
end