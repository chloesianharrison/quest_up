import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="xp"
export default class extends Controller {
  static targets = ["completed"]
  connect() {
    console.log("connected")
  }

  total(){
    console.log("clicked")
  }
}
