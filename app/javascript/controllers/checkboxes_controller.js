import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "modalDiv", "amount", "bg"]
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
      if (data.quest_xp > 0){
        this.openModal(data.quest_xp)
      }
      // this.closeModal()
      // setTimeout(this.closeModal, 3000)
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
    }) .then(response => response.json())
    .then((data) => {
      // get xp values
      const xp = document.getElementById('xpcounter')
      console.log(xp)
      let newXp = parseInt(xp.innerText.split(' ')[1]) - data.reward_xp
      console.log(newXp)
      const level = document.getElementById('levelcounter')
      let newLevel = parseInt(level.innerText.split(' ')[1])
      // get progress bar
      const progress = document.getElementById('progress-bar')
      if (newLevel < 0){
        newXP = 0
        newLevel = 1
      }else {
        if (newXp < 0){
          newLevel = newLevel -1
          newXp = 100 + newXp
        } else if (newXp >= 100){
          newLevel = newLevel +1
          newXp = newXp - 100
        }
      }
      level.innerText = `Level: ${newLevel}`
      xp.innerText = `XP: ${newXp}`
      progress.style.width = `${newXp}%`
      this.spending(newXp, newLevel)
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

  spending(newXp, newLevel){
    const spend = document.getElementById('spend')
    if (newLevel > 0){
      spend.innerText = `XP to spend: ${newLevel}${newXp}`
     } else {
      spend.innerText = `XP to spend: ${newXp}`
     }

    const spending = document.getElementById('spending')
    if (newLevel = 0){
      spending.innerText = `XP to spend: ${newXp}`
    } else{
      spending.innerText = `XP to spend: ${newLevel}${newXp}`
    }
   }

  openModal(quest_xp){
    this.amountTarget.innerText = `You earned ${quest_xp}XP!`
    this.modalTarget.classList.add("modal-display");
    this.modalTarget.classList.add("show");
    // document.body.innerHTML += '';
    this.modalDivTarget.classList.add("modal-backdrop")
    this.modalDivTarget.classList.add("fade")
    this.modalDivTarget.classList.add("show")
    this.bgTarget.classList.add("modal-backdrop")
  }

  closeModal(){
    // console.log(this.modalTarget)
    this.modalTarget.classList.remove("modal-display")
    // modal.classList.remove("modal-display")
    // this.modalTarget.classList.remove("modal-display");
    this.modalTarget.classList.remove("show");
    // this.bodyTarget.remove();
    this.modalDivTarget.classList.remove("modal-backdrop")
    this.modalDivTarget.classList.remove("fade")
    this.modalDivTarget.classList.remove("show")
    this.bgTarget.classList.remove("modal-backdrop")
    // document.getElementsByClassName('modal-backdrop').remove()
    // this.modalTarget.classList.add("d-none")

  }
}
