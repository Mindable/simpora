Rails.application.routes.draw do
  
  devise_for :users, controllers: { 
    sessions: "users/sessions", 
    registrations: "users/registrations"
  }

  devise_for :admins, controllers: { 
    sessions: "admins/sessions", 
    registrations: "admins/registrations"
  }
  
  resources :admins do
    collection do
      resources :categories
      resources :products do 
        collection do 
          post :add_batch
          get :batch_products
          post :validate_batch
          post :update_products
        end
      end        
    end
  end

  root to: "products#index"
end
