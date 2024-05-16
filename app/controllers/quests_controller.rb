class QuestsController < ApplicationController
  def index
    @quests = Quest.where(user_id: current_user[:id])
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
    respond_to do |format|
      if @quest.update(quest_params)
        format.html {redirect_to quests_path}
        format.json
      else
        format.html {render :edit, status: :unprocessable_entity}
        format.json
      end
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
