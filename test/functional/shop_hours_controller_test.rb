require 'test_helper'

class ShopHoursControllerTest < ActionController::TestCase
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
      post :create, :shop_hour => { }
    end

    assert_redirected_to shop_hour_path(assigns(:shop_hour))
  end

  test "should show shop_hour" do
    get :show, :id => shop_hours(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => shop_hours(:one).to_param
    assert_response :success
  end

  test "should update shop_hour" do
    put :update, :id => shop_hours(:one).to_param, :shop_hour => { }
    assert_redirected_to shop_hour_path(assigns(:shop_hour))
  end

  test "should destroy shop_hour" do
    assert_difference('ShopHour.count', -1) do
      delete :destroy, :id => shop_hours(:one).to_param
    end

    assert_redirected_to shop_hours_path
  end
end
