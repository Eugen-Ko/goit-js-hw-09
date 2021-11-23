// ------------------------------------------
// Импорт библиотек
// ------------------------------------------
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
// ------------------------------------------

// Объект расположений ----------------------
const form = document.querySelector('.form');
// счетчик нажатий "Create promises"
let numberClick = 0;
// ------------------------------------------

// ------------------------------------------
// --- Блок обработки -----------------------
// ------------------------------------------
// Собираем значение полей формы
const createDataObj = () => {
  const formData = new FormData(form);

  const dataObj = {};
  formData.forEach((value, name) => {
    dataObj[name] = Number(value);
  });
  return dataObj;
};

// Создаем проммисы
const createPromise = ({ index, timeDelay }) => {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ index, timeDelay });
      }
      // Reject
      reject({ index, timeDelay });
    }, timeDelay);
  });
};

// Цикл создания промисов по колличеству
const cycleForCreate = ({ delay, step, amount }) => {
  let timeDelay = delay;

  for (let index = 1; index <= amount; index++) {
    timeDelay += step;

    createPromise({ index, timeDelay })
      .then(({ index, timeDelay }) => {
        Notiflix.Notify.success(
          ` При клике № ${numberClick} ${index}-й промис выполнен за ${timeDelay} мсек !!`,
        );
      })
      .catch(({ index, timeDelay }) => {
        Notiflix.Notify.failure(
          ` При клике № ${numberClick} ${index}-й промис откленен за ${timeDelay} мсек !!`,
        );
      });
  }
};

// Обработка слушателя по onSubmit
const onSubmitCreateP = e => {
  e.preventDefault();
  numberClick += 1;
  cycleForCreate(createDataObj());
};

// ------------------------------------------
// --- Конец блока обработки ------------
// ------------------------------------------

// --- Слушатели ----------------------------
form.addEventListener('submit', onSubmitCreateP);
