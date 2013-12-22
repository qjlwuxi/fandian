# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_fandian_session',
  :secret      => '5044ba9899f5c98d1db6b402d9cb804c65db1e190f0578b522e18955625d2547b8211d748c858e2176af8a4b412f8ae3b85f26a594b475400dbcbec218cfea8f'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
