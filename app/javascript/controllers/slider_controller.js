import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="slider"
export default class extends Controller {
  static targets =["sliderValue", "sliderDisplay"]
  static values = {
    label: String
  }

  // initialize() {
  //   let rating = this.sliderValueTarget.value
  //   this.sliderDisplayTarget.innerHTML += ` ${rating}`;
  // }

  connect() {
  }

  handleSlider() {
    console.log(this.labelValue)
    let rating = this.sliderValueTarget.value
    console.log(rating)
    this.sliderDisplayTarget.innerHTML = `${this.labelValue} ${rating}`;
    // this.sliderDisplayTarget.InnerHTML = ` ${this.sliderValueTarget.value}`;
    }
  }
