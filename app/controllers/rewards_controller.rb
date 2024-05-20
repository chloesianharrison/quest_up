class RewardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @rewards = Reward.where(user_id: current_user[:id])
    @done = @rewards.where(completed: true)
    @spend = current_user.xp
    @done.each do |reward|
      @spend -= reward.xp
    end
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
    @user = @reward.user
    respond_to do |format|
      if @reward.update(reward_params)
        @spend = @user.xp - @reward.xp if @reward.completed == true
        @spend = @user.xp if @reward.completed == false
        @user.save
        format.html {redirect_to rewards_path}
        format.json
      else
        format.html {render :edit, status: :unprocessable_entity}
        format.json
      end
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
