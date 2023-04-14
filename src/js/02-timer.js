import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    const currentDate = new Date();
    const selectedDate = selectedDates[0];

    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      button.setAttribute('disabled', true);
    }
    if (selectedDate >= currentDate) {
      Notiflix.Notify.success('Date selected successfully');
      button.removeAttribute('disabled', true);
    }
  },
});

const input = document.getElementById('datetime-picker');
const button = document.querySelector('[data-start]');

const daysItem = document.querySelector('[data-days]');
const hoursItem = document.querySelector('[data-hours]');
const minutesItem = document.querySelector('[data-minutes]');
const secondsItem = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const hours = Math.floor((ms % day) / hour);
  const days = Math.floor(ms / day);

  secondsItem.textContent = addLeadingZero(seconds);
  minutesItem.textContent = addLeadingZero(minutes);
  hoursItem.textContent = addLeadingZero(hours);
  daysItem.textContent = addLeadingZero(days);

  return {
    daysItem,
    hoursItem,
    minutesItem,
    secondsItem,
  };
}

function updateTimer() {
  if (datetimePicker.selectedDates.length > 0) {
    const update = datetimePicker.selectedDates[0] - new Date().getTime();

    if (update <= 0) {
      clearInterval(intervalId);
      return;
    }

    convertMs(update);
  }
}

let intervalId;
button.addEventListener('click', () => {
  intervalId = setInterval(updateTimer, 1000);
});

datetimePicker.element.addEventListener('change', () => {
  clearInterval(intervalId);
  updateTimer();
});
