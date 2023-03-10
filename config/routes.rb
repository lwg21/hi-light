Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  resources :books
  resources :highlights, only: ['index', 'destroy', 'update']
  resources :tags, only: ['index', 'new', 'create', 'edit', 'update', 'destroy']
  resources :users, only: ['show', 'index']
  get "friends/:id", to: "users#friends_profile", as: "friend"
  get "import", to: "highlights#import"
  post "upload", to: "highlights#upload"
  get "dashboard", to: "users#dashboard"
  get "manage", to: "books#manage"
  patch "follow/:id", to: "users#follow", as: "follow"
end
