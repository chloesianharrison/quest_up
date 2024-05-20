import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "modalDiv"]
  static values = {
    token: String
  }

  completeQuest(event) {
    event.preventDefault();
    const questId = event.target.dataset.id
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
      this.openModal()
      // this.closeModal()
      // setTimeout(this.closeModal, 3000)
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

  toSpend(newXp, newLevel){
    const spend = document.getElementById('spend')
    if (newLevel > 0){
      spend.innerText = `XP to spend: ${newLevel}${newXp}`
     } else {
      spend.innerText = `XP to spend: ${newXp}`
     }
  }

  openModal(){
    this.modalTarget.classList.add("modal-display");
    this.modalTarget.classList.add("show");
    // document.body.innerHTML += '';
    this.modalDivTarget.classList.add("modal-backdrop")
    this.modalDivTarget.classList.add("fade")
    this.modalDivTarget.classList.add("show")
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
    // document.getElementsByClassName('modal-backdrop').remove()
    // this.modalTarget.classList.add("d-none")

  }
}
