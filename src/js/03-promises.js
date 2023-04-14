import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onClickFormButton);

function onClickFormButton(event) {
  event.preventDefault();

  const delay = document.querySelector('.js-input-task-3[name="delay"]');
  const step = document.querySelector('.js-input-task-3[name="step"]');
  const amount = document.querySelector('.js-input-task-3[name="amount"]');

  for (let i = 1; i <= Number(amount.value); i++) {
    createPromise(i, Number(delay.value) + (i - 1) * Number(step.value))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}
