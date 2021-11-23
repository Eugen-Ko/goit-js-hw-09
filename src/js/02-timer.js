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

  timer: document.querySelector('.timer'),
};

// Объект временных интервалов --------------
const timeRange = {
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000,
};

// Глобальная переменная временной разницы --
let timeDiff = null;
// Глобальная переменная экземпляра flatpickr
let inputF = null;
// Глобальная переменная счетчика
let timerId = null;

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
refs.startBtn.setAttribute('disabled', true);

// Создание и удаление экземпляра flatpickr ---
const creatFlatPickr = action => {
  if (action === 'create') {
    inputF = new flatpickr('#datetime-picker', options);
    return;
  }
  if (action === 'destroy') {
    inputF.destroy();
    return;
  }
};

creatFlatPickr('create');

// Создание и скрытие кнопки Стоп
const createStopBtn = () => {
  refs.timer.insertAdjacentHTML(
    'beforebegin',
    `<button class="button02" type="button" data-stop>Stop and Clear</button>`,
  );
};

createStopBtn();
const stopBtn = document.querySelector('[data-stop]');
stopBtn.style.visibility = 'hidden';

// ------------------------------------------
// --- Конец блока инициализации ------------
// ------------------------------------------

// ------------------------------------------
// --- Блок обработки -----------------------
// ------------------------------------------

// --- Обработчик даты ----------------------
const dateHandler = () => {
  // Получаем введенную дату в милисекундах
  const dateMS = Date.parse(refs.fieldInput.value);
  // Получаем текущую дату в милисекундах
  const currentDate = new Date();
  // Проверяем или вбраная дата больше текущей
  if (dateMS - currentDate.getTime() < 0) {
    // Деактивируем кнопку Старт если передумали
    // и изменили дату на неправильную до нажатия Старт
    refs.startBtn.setAttribute('disabled', true);
    // Сообщение о неправильной дате
    Notiflix.Report.failure(
      'Ахтунг !!!',
      'Вы ввели дату из прошлого. Нажмите на кнопку и ждите машину времени !!!',
      'Вызов машины времени',
    );
    // alert('Введенная дата и время уже прошли. Выберете дату из будущего');
    // конец функции
    return;
  }

  // Активируем кнопку старт
  refs.startBtn.removeAttribute('disabled');
  Notiflix.Notify.success('Все ОК!! Можем начинать осчет !!!');
  timeDiff = dateMS - currentDate.getTime();
  writeTimerValue(timeDiff);
};

// --- Дописываем нуль к числу менше 10 -----
const addZeroToNumber = number => String(number).padStart(2, '0');

// --- Конвертация миллисекунд в дату -------
const convertMSecToDate = current => {
  // Деструктуризация
  const { second, minute, hour, day } = timeRange;

  // Высчитываем значения дня, часа, минуты, секунды
  const days = addZeroToNumber(Math.floor(current / day));
  const hours = addZeroToNumber(Math.floor((current % day) / hour));
  const minutes = addZeroToNumber(Math.floor(((current % day) % hour) / minute));
  const seconds = addZeroToNumber(Math.floor((((current % day) % hour) % minute) / second));

  // Возвращаем объект полученных значений
  return { days, hours, minutes, seconds };
};

// --- Запись значения таймера --------------
const writeTimerValue = current => {
  // Деструктуризация
  const { days, hours, minutes, seconds } = convertMSecToDate(current);

  // Прописываем значения в поля счетчика
  refs.daysCounter.textContent = days;
  refs.hoursCounter.textContent = hours;
  refs.minutesCounter.textContent = minutes;
  refs.secondsCounter.textContent = seconds;
};

// --- Счетчик -------------------------------
const reverseCounter = timeDiff => {
  let current = timeDiff;
  timerId = setInterval(() => {
    if (current === 0) {
      clearInterval(timerId);
    }
    current -= 1000;
    writeTimerValue(current);
  }, 1000);
};

// --- Отработка по нажатию Стоп
const onStopClick = () => {
  // Останавливаем таймер
  clearInterval(timerId);
  // Очищаем поля счетчика
  refs.daysCounter.textContent = '00';
  refs.hoursCounter.textContent = '00';
  refs.minutesCounter.textContent = '00';
  refs.secondsCounter.textContent = '00';
  // Активируем flatpicker
  creatFlatPickr('create');
  // Делаем кнопку невидимой
  stopBtn.style.visibility = 'hidden';
};

// --- Обработка нажатия кнопки Старт -------
const onStartClick = () => {
  // Деактивируем кнопку Старт
  refs.startBtn.setAttribute('disabled', true);
  // Запускаем отсчет таймера
  reverseCounter(timeDiff);
  // Удаляем экземпляр, что бы избежать
  // повторного запуска.
  creatFlatPickr('destroy');
  // Создаем кнопку Стоп
  stopBtn.style.visibility = 'visible';
};
// ------------------------------------------
// --- Конец блока обработки ------------
// ------------------------------------------

// ------------------------------------------
// --- Слушатели ----------------------------
// ------------------------------------------
refs.startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
// ------------------------------------------
