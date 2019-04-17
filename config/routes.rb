Rails.application.routes.draw do
  root to: 'application#index'
  get :mta_data, to: 'application#mta_data'
end
