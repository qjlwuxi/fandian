require 'test_helper'

class PrimaryBusinessesControllerTest < ActionController::TestCase
  setup do
    @primary_business = primary_businesses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:primary_businesses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create primary_business" do
    assert_difference('PrimaryBusiness.count') do
      post :create, primary_business: { enable: @primary_business.enable, name: @primary_business.name }
    end

    assert_redirected_to primary_business_path(assigns(:primary_business))
  end

  test "should show primary_business" do
    get :show, id: @primary_business
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @primary_business
    assert_response :success
  end

  test "should update primary_business" do
    put :update, id: @primary_business, primary_business: { enable: @primary_business.enable, name: @primary_business.name }
    assert_redirected_to primary_business_path(assigns(:primary_business))
  end

  test "should destroy primary_business" do
    assert_difference('PrimaryBusiness.count', -1) do
      delete :destroy, id: @primary_business
    end

    assert_redirected_to primary_businesses_path
  end
end
