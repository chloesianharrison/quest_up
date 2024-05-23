class RewardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @rewards = Reward.where(user_id: current_user[:id])
    @done = @rewards.where(completed: true)
    case params['sortOption']
    when 'claimed'
      @rewards = @rewards.select { |reward| reward.completed }
    when 'earned'
      @rewards = @rewards.select { |reward| reward.xp <= current_user.xp }
    end

    @spend = current_user.xp
    if current_user.xp.negative?
      @spend = 0
    else
      @spend = current_user.xp
    end

    @done.each do |reward|
      @spend -= reward.xp if reward.xp.positive?
    end

    @rewards.each do |earned|
      if earned.xp <= @spend
        earned.earned = true
      else
        earned.earned = false
      end
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
    if params[:reward][:completed]
      @reward.completed = !@reward.completed
    end
    @reward.save
    @user = @reward.user
    @reward.update(reward_params)
    respond_to do |format|
      format.html { redirect_to rewards_path }
      format.json
    end
  end

  def destroy
    @reward = Reward.find(params[:id])
    Reward.destroy(params[:id])
    redirect_to rewards_path, status: :see_other
  end

  private

  def reward_params
    params.require(:reward).permit(:name, :xp, :details, :completed, :earned)
  end
end
