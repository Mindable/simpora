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
      resources :products do 
        
        collection do 
          get :batch_products
        end

        collection do
          post :add_batch
        end

        collection do
          post :validate_batch
        end
        
      end        
    end

    collection do
      resources :categories
    end   
  end

  root to: "products#index"
end
