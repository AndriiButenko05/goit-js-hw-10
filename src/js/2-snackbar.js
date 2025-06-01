import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayUser = document.querySelector('input[name="delay"]');
const notificationTrue = document.querySelector('input[value="fulfilled"]');
const notificationFalse = document.querySelector('input[value="rejected"]');
delayUser.addEventListener("keydown", () => {
    delayUser.style.borderColor = "#4E75FF";
});
delayUser.addEventListener("blur", () => {
    delayUser.style.borderColor = "#808080";
})
form.addEventListener(`submit`, event => {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (notificationTrue.checked == true && notificationFalse.checked === false) {
        resolve(
          iziToast.show({
            message: `✅Fulfilled promise in ${delayUser.value}ms`,
            color: 'green',
            position: 'topRight',
            messageColor: 'white',
          })
        );
      } else {
          reject(
            iziToast.show({
                message:`❌ Rejected promise in ${delayUser.value}ms`,
                color: 'red',
                position: 'topRight',
                messageColor: 'white',
              })
        );
        }
        form.reset();
    }, delayUser.value);
  });
  promise
    .then(value => {
      console.log(value);
    })
    .catch(error => {
      console.log(error);
    });
    
});
