import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  completeQuest(event) {
    const form = event.currentTarget.form
    fetch(form.action, {
      method: "PATCH", // Could be dynamic with Stimulus values
      headers: { "Accept": "application/json" },
      body: new FormData(form)
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
    const form = event.currentTarget.form
    fetch(form.action, {
      method: "PATCH", // Could be dynamic with Stimulus values
      headers: { "Accept": "application/json" },
      body: new FormData(form)
    })

  }

}
