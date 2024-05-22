class UsersController < ApplicationController
  def update
    user = User.find(params[:id])
    if params[:user] && params[:user][:xp]
      user.xp += params[:user][:xp]
      user.save
    end
    head :ok
  end
end
