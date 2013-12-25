require 'test_helper'

class ShopHoursControllerTest < ActionController::TestCase
  setup do
    @shop_hour = shop_hours(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:shop_hours)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create shop_hour" do
    assert_difference('ShopHour.count') do
      post :create, shop_hour: { end_time: @shop_hour.end_time, shop_id: @shop_hour.shop_id, start_time: @shop_hour.start_time }
    end

    assert_redirected_to shop_hour_path(assigns(:shop_hour))
  end

  test "should show shop_hour" do
    get :show, id: @shop_hour
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @shop_hour
    assert_response :success
  end

  test "should update shop_hour" do
    put :update, id: @shop_hour, shop_hour: { end_time: @shop_hour.end_time, shop_id: @shop_hour.shop_id, start_time: @shop_hour.start_time }
    assert_redirected_to shop_hour_path(assigns(:shop_hour))
  end

  test "should destroy shop_hour" do
    assert_difference('ShopHour.count', -1) do
      delete :destroy, id: @shop_hour
    end

    assert_redirected_to shop_hours_path
  end
end
