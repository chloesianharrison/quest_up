import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    token: String
  }

  completeQuest(event) {
    event.preventDefault();
    const form = event.target.dataset.id
    event.target.classList.toggle('checked');
    fetch(`/quests/${questId}`, {
      method: "PATCH", // Could be dynamic with Stimulus values
      headers: {
        "Accept": "application/json",
        "X-CSRF-Token": this.tokenValue
      },
      body: JSON.stringify({completed: true})
    })
    .then(response => response.json())
    .then((data) => {
      const xp = document.getElementById('xpcounter')
      let newXp = parseInt(xp.innerText.split(' ')[1]) + data.quest_xp
      console.log(newXp)
      const level = document.getElementById('levelcounter')
      if (newXp < 0){
        const newLevel = parseInt(level.innerText.split(' ')[1]) -1
         newXp = 100 + newXp
         level.innerText = `Level: ${newLevel}`
      } else if (newXp >= 100){
        const newLevel = parseInt(level.innerText.split(' ')[1]) +1
        newXp = newXp - 100
        level.innerText = `Level: ${newLevel}`
      }
      xp.innerText = `XP: ${newXp}`

    })
  }

  completeReward(event) {
    event.preventDefault();
    const rewardId = event.target.dataset.id;
    event.target.classList.toggle('checked');
    fetch(`/rewards/${rewardId}`, {
      method: "PATCH", // Could be dynamic with Stimulus values
      headers: {
        "Accept": "application/json",
        "X-CSRF-Token": this.tokenValue
      },
      body: JSON.stringify({completed: true})
    })

  }

}
