const throttle = require('lodash.throttle');

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let asyncFn = null;

buttonStart.addEventListener('click', throttle(onButtonClickStart, 2000));
buttonStop.addEventListener('click', onButtonClickStop);

function onButtonClickStart(event) {
  asyncFn = setInterval(() => {
    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
    }

    const newColor = getRandomHexColor();
    document.body.style.backgroundColor = newColor;
  }, 1000);
  buttonStop.removeAttribute('disabled');
  if (!buttonStop.disabled) {
    buttonStart.setAttribute('disabled', true);
  }
}

function onButtonClickStop() {
  clearInterval(asyncFn);
  buttonStart.removeAttribute('disabled');
  if (!buttonStart.disabled) {
    buttonStop.setAttribute('disabled', true);
  }
}
