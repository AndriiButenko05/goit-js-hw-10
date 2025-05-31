'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = new Date(selectedDates);
    if (userSelectedDate.getTime() - date.getTime() < 0) {
      iziToast.show({
    title: 'Error',
    message: 'Illegal operation',
    color: "red",
    position: "topRight",
        titleColor: 'white',
        messageColor: "white",
        iconUrl:"/img/Cross.svg"
});
      buttonStart.disabled = true;
      return;
    } else {
      buttonStart.disabled = false;
    }
  },
};


const selector = document.querySelector('#datetime-picker');
flatpickr(selector, options);
let userSelectedDate;
const buttonStart = document.querySelector('.button');
buttonStart.disabled = true;
const date = new Date();

const input = document.querySelector('.date-picker');
let dayUser = document.querySelector('[data-days]');
let hoursUser = document.querySelector('[data-hours]');
let minutesUser = document.querySelector('[data-minutes]');
let secondsUser = document.querySelector('[data-seconds]');

buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const displayTime = userSelectedDate.getTime() - now.getTime();

    if (displayTime <= 0) {
      clearInterval(timerId);
      updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      buttonStart.disabled = false;
      input.disabled = false;

      return;
    }
    const convertedTime = convertMs(displayTime);
    updateDisplay(convertedTime);
  });
});

function updateDisplay({ days, hours, minutes, seconds }) {
  dayUser.textContent = addLeadingZero(String(days));
  hoursUser.textContent = addLeadingZero(String(hours));
  minutesUser.textContent = addLeadingZero(String(minutes));
  secondsUser.textContent = addLeadingZero(String(seconds));
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
