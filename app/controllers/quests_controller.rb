class QuestsController < ApplicationController
  def index
    @quests = Quest.where(Quest[:user] == current_user[:id])
  end

  def new
    @quest = Quest.new
  end

  def create
    @quest = Quest.new(quest_params)
    @quest.user = current_user
    quest.xp = ((@quest.fun_rating + @quest.difficulty_rating + @quest.consequence_level) / 3) * 10.floor
    if @quest.save
      redirect_to quests_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def quest_params
    params.require(:quest).permit(:name, :notes, :due_date, :fun_rating, :difficulty_rating, :consequence_level, :completed)
  end
end
