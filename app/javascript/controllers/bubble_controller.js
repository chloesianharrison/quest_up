import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="bubble"
export default class extends Controller {
  connect() {
  }
}

const xpCounter= 0
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

bubbles.forEach(bubble => {
   bubble.addEventListener('click', (e) => {
      popBubble(e, bubble);
      xpCounter += 1;
   });

   bubble.addEventListener('animationend', () => {
      resetBubble(bubble);
   });
});
