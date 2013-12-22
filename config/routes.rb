ActionController::Routing::Routes.draw do |map|
  map.connect 'order/success/:id', :controller => 'orders', :action => 'success'
  map.connect 'order/SendOrder', :controller => 'orders', :action => 'SendOrder'
  map.connect '/user_contact/CheckContactInfo', :controller => 'user_contacts', :action => 'CheckContactInfo'
  map.resources :user_contacts
  map.connect 'personal/iAdd', :controller => 'personals', :action => 'iAdd'
  map.connect 'order/checkout', :controller => 'orders', :action => 'checkout'
  map.resources :order_logs
  map.resources :order_details
  map.resources :orders
  map.resources :users
  map.connect '/areas/check_shop', :controller => 'areas', :action => 'check_shop'
  map.resources :foods
  map.resources :food_types
  map.resources :primary_businesses
  map.resources :shop_hours
  map.resources :cities
  map.connect 'shops/get_detail', :controller => 'shops', :action => 'get_detail'
  map.connect 'shop/:id', :controller => 'shops', :action => 'show'
  map.resources :shops
  map.connect 'area/:id', :controller => 'areas', :action => 'show'
  map.resources :areas

  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller
  
  # Sample resource route with more complex sub-resources
  #   map.resources :products do |products|
  #     products.resources :comments
  #     products.resources :sales, :collection => { :recent => :get }
  #   end

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "welcome"

  # See how all your routes lay out with "rake routes"

  # Install the default routes as the lowest priority.
  # Note: These default routes make all actions in every controller accessible via GET requests. You should
  # consider removing or commenting them out if you're using named routes and resources.
  map.root :controller => 'home'
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
