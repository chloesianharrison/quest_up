import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    token: String
  }
  completeQuest(event) {
    event.preventDefault();
    event.currentTarget.classList.toggle('checked');

    const questId = event.currentTarget.dataset.id;
    fetch(`/quests/${questId}`, {
      method: "PATCH",
      headers: {
         "Accept": "application/json",
         "X-CSRF-Token": this.tokenValue
      },
      body: JSON.stringify({completed: true})
    })
  .then(response => response.json())
  .then((data) => {
      // get xp values
      const xp = document.getElementById('xpcounter')
      let newXp = parseInt(xp.innerText.split(' ')[1]) + data.quest_xp
      // get level values
      const level = document.getElementById('levelcounter')
      let newLevel = parseInt(level.innerText.split(' ')[1])
      // get progress bar
      const progress = document.getElementById('progress-bar')
      if (newXp < 0){
        newLevel = newLevel -1
        newXp = 100 + newXp
      } else if (newXp >= 100){
        newLevel = newLevel +1
        newXp = newXp - 100
      }
      level.innerText = `Level: ${newLevel}`
      xp.innerText = `XP: ${newXp}`
      progress.style.width = `${newXp}%`
      this.toSpend(newXp, newLevel)
    })
  }

  completeReward(event) {
    event.preventDefault();
    event.currentTarget.classList.toggle('checked');

    const rewardId = event.currentTarget.dataset.id;
    fetch(`/rewards/${rewardId}`, {
      method: "PATCH",
      headers: {
         "Accept": "application/json",
         "X-CSRF-Token": this.tokenValue
      },
      body: JSON.stringify({completed: true})
    })
  }



  toSpend(newXp, newLevel){
    const spend = document.getElementById('spend')
    if (newLevel > 0){
      spend.innerText = `XP to spend: ${newLevel}${newXp}`
     } else {
      spend.innerText = `XP to spend: ${newXp}`
     }
  }

}
