class RewardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @rewards = Reward.all
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
      render :new
    end
  end

  private

  def reward_params
    params.require(:reward).permit(:name, :xp, :details)
  end
end
