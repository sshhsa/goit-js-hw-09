import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const currentDate = new Date();

const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
      button.setAttribute('disabled', true);
    }
    if (selectedDate >= currentDate) {
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

function updateTimer() {
  if (datetimePicker.selectedDates.length > 0) {
    const update = datetimePicker.selectedDateElem[0] - currentDate;

    if (update <= 0) {
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(update / (1000 * 60 * 60 * 24));
    const hours = Math.floor((update / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((update / (1000 * 60)) % 60);
    const seconds = Math.floor((update / 1000) % 60);

    daysItem.textContent = days.toString().padStart(2, '0');
    hoursItem.textContent = hours.toString().padStart(2, '0');
    minutesItem.textContent = minutes.toString().padStart(2, '0');
    secondsItem.textContent = seconds.toString().padStart(2, '0');
  }
}

let intervalId;
button.addEventListener('click', () => {
  intervalId = setInterval(updateTimer, 1000);
});
