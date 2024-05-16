class RewardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @rewards = Reward.where(user_id: current_user[:id])
  end

  def new
    @reward = Reward.new
  end

  def create
    @reward = Reward.new(reward_params)
    @reward.user = current_user
    if @reward.save
      redirect_to rewards_path(@reward)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @reward = Reward.find(params[:id])
  end

  def update
    @reward = Reward.find(params[:id])
    if @reward.update(reward_params)
      redirect_to rewards_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @reward = Reward.find(params[:id])
    Reward.destroy(params[:id])
    redirect_to rewards_path, status: :see_other
  end

  private

  def reward_params
    params.require(:reward).permit(:name, :xp, :details)
  end
end
