Tail::Engine.routes.draw do
  root 'logs#index'
  resources :logs, only: :index
  get 'grep' => 'logs#grep'
  get 'flush' => 'logs#flush'
end
