import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="slider"
export default class extends Controller {
  static targets =["sliderValue", "sliderDisplay"]
  static values = {
    label: String
  }
  initialize(){
    let rating = this.sliderValueTarget.value
    this.sliderDisplayTarget.innerHTML = `${this.labelValue} ${rating}`;
  }

  connect() {
  }

  handleSlider() {
    let rating = this.sliderValueTarget.value
    this.sliderDisplayTarget.innerHTML = `${this.labelValue} ${rating}`;
    }
  }
