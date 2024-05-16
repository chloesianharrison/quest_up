import { Controller } from "@hotwired/stimulus"


// Connects to data-controller="xp"
export default class extends Controller {
  static targets = ["completed", "xp",]
  static values ={
    amount: String,
    user: String

  }
  connect() {
    console.log(this.completedTarget)
  }

  total(){
    console.log(this.userValue)
    // console.log(this.completedTarget.checked)
    // if (this.completedTarget.checked){
    //   Rails.ajax({
    //     url: `app/controllers/quests_controller.rb`,
    //     type: "POST",
    //     success: (data) => {

    //     }
    //   })
    // }
    // console.log(this.amountValue)
    // this.completedTarget.checked
  }
}
