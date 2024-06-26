import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "modalDiv", "amount", "bg"]
  static values = {
    token: String
  }

  completeQuest(event) {
    event.preventDefault();
    event.currentTarget.classList.toggle('checked');
    const body = {quest: {}};
    event.currentTarget.classList.contains("checked") ? body.quest = {completed: true} : body.quest = {completed: false}
    const questId = event.currentTarget.dataset.id;
    fetch(`/quests/${questId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": this.tokenValue
      },
      body: JSON.stringify(body)
    })

  .then(response => response.json())
  .then((data) => {
      //get xp values
      // console.log(data.user)
      // console.log(data.quest_xp);
      const xp = document.getElementById('xpcounter')
      let newXp = parseInt(xp.innerText.split(' ')[1]) + data.quest_xp

      // console.log(newXp)
      // get level values
      const level = document.getElementById('levelcounter')
      let newLevel = parseInt(level.innerText.split(' ')[1])
      // console.log(newLevel)
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
      // console.log(newLevel)
      xp.innerText = `XP: ${newXp}`
      // console.log(newXp)
      // console.log(newXp)
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
    const body = {reward: {}};
    event.currentTarget.classList.contains("checked") ? body.reward = {completed: true} : body.reward = {completed: false}
    const rewardId = event.currentTarget.dataset.id;
    fetch(`/rewards/${rewardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
         "Accept": "application/json",
         "X-CSRF-Token": this.tokenValue
      },
      body: JSON.stringify(body)
    }) .then(response => response.json())
    .then((data) => {
      // get xp values
      // console.log(data)
      const xp = document.getElementById('xpcounter')
      let newXp = parseInt(xp.innerText.split(' ')[1])
      console.log(newXp)
      const spend = document.getElementById('spending')
      // console.log(spend)
      const xpToSpend = document.getElementById('spend')
      console.log(xpToSpend);
      let newSpend = parseInt(xpToSpend.innerText.split(' ')[3])
      console.log(newSpend)

      newSpend = newSpend - data.reward_xp
      // console.log(newSpend)
      console.log(newXp)
      const level = document.getElementById('levelcounter')
      let newLevel = parseInt(level.innerText.split(' ')[1])
      // get progress bar
      const progress = document.getElementById('progress-bar')
        if (newXp > 99){
          // console.log("newXP greater than 199")
          let bigXp = newXp.to_s.chars
          // console.log(bigXp)
          newLevel = parseInt(bigXp[0])
          newXp = parseInt(bigXp[1] + bigXp[2])
        } else if (newXp >= 100){
          // console.log("newXP greater than 100")
          newLevel = newLevel +1
          newXp = newXp - 100
        }
      level.innerText = `Level: ${newLevel}`
      xp.innerText = `XP: ${newXp}`
      progress.style.width = `${newXp}%`
      this.spending(newXp, newLevel, newSpend, spend)
    })
  }

  toSpend(newXp, newLevel){
    const spend = document.getElementById('spend')
    if (newLevel > 0){
        // console.log(`XP greater than 0 ${newLevel}${newXp}`)
        spend.innerText = `XP to spend: ${newLevel}${newXp}`
    } else {
      spend.innerText = `XP to spend: ${newXp}`
      // console.log(newXp)
    }
  }


  spending(newXp, newLevel, newSpend, spending){
    const spend = document.getElementById('spend')
    // if (newLevel > 0){
    //   spend.innerText = `XP to spend: ${newSpend}`
    //  } else {
    spend.innerText = `XP to spend: ${newSpend}`
    // console.log(spend)
    //  }

    // const spending = document.getElementById('spending')
    // console.log(spending)
    // if (newLevel = 0){
    //   spending.innerText = `XP to spend: ${newSpend}`
    // } else{
    spending.innerText = `XP to spend: ${newSpend}`
    // console.log(spending)
    // }
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
