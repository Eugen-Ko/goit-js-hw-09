// ------------------------------------------
// Импорт библиотек
// ------------------------------------------
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
// ------------------------------------------

// ------------------------------------------
// --- Блок инициализации -------------------
// ------------------------------------------
// Объект расположений ----------------------
const refs = {
  daysCounter: document.querySelector('[data-days]'),
  hoursCounter: document.querySelector('[data-hours]'),
  minutesCounter: document.querySelector('[data-minutes]'),
  secondsCounter: document.querySelector('[data-seconds]'),

  fieldInput: document.querySelector('#datetime-picker'),

  startBtn: document.querySelector('[data-start]'),
};

// Объект временных интервалов --------------
const timeRange = {
  second: 1000,
  minute: 60000,
  hour: 36000000,
  day: 86400000,
};

// Глобальная переменная временной разницы --
let timeDiff = null;

// Инициализация опций flatpickr и вызов ---
// обработчика времени ---------------------
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates);
    dateHandler();
  },
};

// Кнопка Старт деактивирована --------------
startBtn.setAttribute('disabled', true);

// Навесили на поле ввода вызов flatpickr ---
flatpickr('#datetime-picker', options);

// ------------------------------------------
// --- Конец блока инициализации ------------
// ------------------------------------------

// ------------------------------------------
// --- Блок обработки -----------------------
// ------------------------------------------

// Обработчик даты --------------------------
const dateHandler = () => {
  const dateMS = Date.parse(fieldInput.value);
  const currentDate = new Date();
  if (dateMS - currentDate.getTime() < 0) {
    alert('asfsfs');
    return;
  }
  startBtn.removeAttribute('disabled');
  writeTimerValue(dateMS - currentDate.getTime());
  global = dateMS - currentDate.getTime();
};

// --- Дописываем нуль к числу менше 10 -----
const addZeroToNumber = number => String(number).padStart(2, '0');

// --- Конвертация миллисекунд в дату -------
const converMSecToDate = timeMSec => {
  const days = addZeroToNumber(Math.floor(timeMSec / day));
  const hours = addZeroToNumber(Math.floor((timeMSec % day) / hour));
  const minutes = addZeroToNumber(Math.floor(((timeMSec % day) % hour) / minute));
  const seconds = addZeroToNumber(Math.floor((((timeMSec % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
};

// --- Запись начального значения таймера ----
const writeTimerValue = timeMSec => {
  const { days, hours, minutes, seconds } = converMSecToDate(timeMSec);
  daysCounter.textContent = days;
  hoursCounter.textContent = hours;
  minutesCounter.textContent = minutes;
  secondsCounter.textContent = seconds;
};

// --- Счетчик -------------------------------
const reverseCounter = timeMSec => {
  startBtn.setAttribute('disabled', true);
  let current = timeMSec;
  let timerId = setInterval(() => {
    console.log(current);
    writeTimerValue(current);
    current -= 1000;
    if (current === -1000) {
      clearInterval(timerId);
    }
  }, 1000);
};

// -------------------------------------------

const onInputField = () => {};

// const onBlurField = () => {};

const onStartClick = () => {
  reverseCounter(global);
};
// ------------------------------------------

// --- Слушатели ----------------------------
// ------------------------------------------
fieldInput.addEventListener('focus', onInputField);
// fieldInput.addEventListener('blur', onBlurField);

startBtn.addEventListener('click', onStartClick);
// ------------------------------------------

// // const data = new Date().getTime();
// // console.log(data);

// // setTimeout(() => {
// //    console.log(data);
// //    const date = new Date();
// //    console.log(date);
// // }, 3000);
// const docQuer = document.querySelector('#datetime-picker');
// const startBtn = document.querySelector('[ data-start]');

// console.log(docQuer.value);
// // const res = docQuer.textContent
// // const docQuer = document.createElements();
// const isActive = false;
// const timer = {
//   start() {
//     const startTime = Date.now();
//     // console.log(startTime);
//     setInterval(() => {
//       const currentTime = Date.now();
//       const dataTime = currentTime - startTime;
//       const time = convertMs(dataTime);
//       // console.log(`${days}:${hours}:${minutes}:${seconds}`);
//       // const resOfTime = (`${days}:${hours}:${minutes}:${seconds}`)
//       updateInputFace(time);
//     }, 1000);
//   },
// };

// startBtn.addEventListener('click', () => {
//   //  if (isActive) {
//   //       return
//   // }
//   startBtn.setAttribute('disabled', false);
//   timer.start();
// });

// function updateInputFace({ days, hours, minutes, seconds }) {
//   docQuer.value = `${days}:${hours}:${minutes}:${seconds}`;
// }

// // ==================== функція додає знаки до значення =============================
// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
// // ==================================================================================

// // =================== функція для виоду часу =======================================
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }
// // =================================================================================
