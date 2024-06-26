import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="bubble"
export default class extends Controller {
  static values = {
    token: String,
    userid: String
  }
  connect() {
    let xpCount = 0;
    const counter = document.querySelector("#xpCounter");
    const bubbles = document.querySelectorAll('.bubble');
    const poppedClass = 'bubble--popped';

    const popBubble = (e, bubble) => {
      bubble.classList.add(poppedClass);
      bubble.style.top = `${e.clientY - e.offsetY}px`;
      bubble.style.left = `${e.clientX - e.offsetX}px`;
    };

    const resetBubble = (bubble) => {
      bubble.classList.remove(poppedClass);
      bubble.style.top = '';
      bubble.style.left = '';
    };

    const updateXp = (user_id, xp) => {
      const body = {user: {xp: xp}};
      fetch(`/users/${user_id}`, {
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
          console.log(data)
        })
    };


    const pop = new Audio('http://contentservice.mc.reyrey.net/audio_v1.0.0/?id=e049b733-1543-51fd-9ce9-680f57226aa1')

    bubbles.forEach(bubble => {
      bubble.addEventListener('click', (e) => {
          popBubble(e, bubble);
          xpCount += 1;
          pop.play()
          counter.innerText = `xp: ${xpCount}/10`;
          updateXp(this.useridValue, 1)

          if (xpCount === 10) {
            window.location.href = "/quests";
          }
      });

      bubble.addEventListener('animationend', () => {
          resetBubble(bubble);
      });
    });
  }


}
