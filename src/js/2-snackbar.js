import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayUser = document.querySelector('input[name="delay"]');
const notificationTrue = document.querySelector('input[value="fulfilled"]');
const notificationFalse = document.querySelector('input[value="rejected"]');
delayUser.addEventListener('keydown', () => {
  delayUser.style.borderColor = '#4E75FF';
});
delayUser.addEventListener('blur', () => {
  delayUser.style.borderColor = '#808080';
});
form.addEventListener(`submit`, event => {
  event.preventDefault();
const delay = delayUser.value;
const isFulfilled = notificationTrue.checked;
const isRejected = notificationFalse.checked;
form.reset();
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isFulfilled && !isRejected) {
      resolve();
    } else {
      reject();
    }
  }, delay);
});
promise
  .then(() => {
    iziToast.show({
      message: `✅ Fulfilled promise in ${delay}ms`,
      color: 'green',
      position: 'topRight',
      messageColor: 'white',
    });
  })
  .catch(() => {
    iziToast.show({
      message: `❌ Rejected promise in ${delay}ms`,
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
    });
  });
});
