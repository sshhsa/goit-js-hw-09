import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
      button.setAttribute('disabled', true);
    } else {
      button.removeAttribute('disabled', true);
    }
  },
});

const input = document.getElementById('datetime-picker');
const button = document.querySelector('[data-start]');
