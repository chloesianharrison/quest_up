import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  completeQuest(event) {
    const form = event.currentTarget.form
    fetch(form.action, {
      method: "PATCH", // Could be dynamic with Stimulus values
      headers: { "Accept": "application/json" },
      body: new FormData(form)
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
