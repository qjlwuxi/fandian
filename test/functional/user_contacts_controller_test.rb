require 'test_helper'

class UserContactsControllerTest < ActionController::TestCase
  setup do
    @user_contact = user_contacts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_contacts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_contact" do
    assert_difference('UserContact.count') do
      post :create, user_contact: { user_id: @user_contact.user_id }
    end

    assert_redirected_to user_contact_path(assigns(:user_contact))
  end

  test "should show user_contact" do
    get :show, id: @user_contact
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_contact
    assert_response :success
  end

  test "should update user_contact" do
    put :update, id: @user_contact, user_contact: { user_id: @user_contact.user_id }
    assert_redirected_to user_contact_path(assigns(:user_contact))
  end

  test "should destroy user_contact" do
    assert_difference('UserContact.count', -1) do
      delete :destroy, id: @user_contact
    end

    assert_redirected_to user_contacts_path
  end
end
