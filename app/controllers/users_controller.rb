class UsersController < ApplicationController
  before_action :set_highlight, only: ['destroy', 'update']
  before_action :set_user, only: ['follow', 'show', 'friends_profile']

  def show
  end

  def friends_profile
  end

  def index
    @users = User.all
  end

  def follow
    if current_user.favorited?(@user)
      current_user.unfavorite(@user)
    else
      current_user.favorite(@user)
    end
    redirect_to users_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
