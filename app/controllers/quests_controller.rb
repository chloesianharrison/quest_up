class QuestsController < ApplicationController
  def index
    @quests = Quest.where(user_id: current_user[:id])
    case params['sortOption']
    when 'easyQuest'
      @quests = @quests.select { |quest| quest.xp < 40 }
    when 'midQuest'
      @quests = @quests.select { |quest| quest.xp < 70 }
    when 'hardQuest'
      @quests = @quests.select { |quest| quest.xp > 70 }
    when 'completed'
      @quests = @quests.select { |quest| quest.completed }
    end
    if params['dateOption'].present?
      selected_date = Date.parse(params['dateOption'])
      @quests = @quests.select { |quest| quest.due_date == selected_date }
    end

    @rewards = Reward.where(user_id: current_user[:id])
    @earned = @rewards.where(earned: true)
  end

  def new
    @quest = Quest.new
  end

  def create
    @quest = Quest.new(quest_params)
    @quest.user = current_user
    @quest.xp = ((@quest.fun_rating + @quest.difficulty_rating + @quest.consequence_level) / 3) * 10.floor
    if @quest.save
      redirect_to quests_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @quest = Quest.find(params[:id])
  end

  def update
    @quest = Quest.find(params[:id])
    @quest.completed = !@quest.completed
    @user = @quest.user
    @quest.save
    respond_to do |format|
      @user.xp += @quest.xp if @quest.completed == true
      @user.xp -= @quest.xp if @quest.completed == false
      @user.save
      format.html {redirect_to quests_path}
      format.json
    end
  end

  def destroy
    @quest = Quest.find(params[:id])
    Quest.destroy(params[:id])
    redirect_to quests_path, status: :see_other
  end

  private

  def quest_params
    params.require(:quest).permit(:name, :notes, :due_date, :fun_rating, :difficulty_rating, :consequence_level, :completed)
  end
end
