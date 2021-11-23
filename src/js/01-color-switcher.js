// --- Функция генерации случайного цвета ---
// ------------------------------------------
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// ------------------------------------------

// --- Блок инициализации -------------------
// ------------------------------------------
const bodyArea = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// Переменная таймера в глобальной зоне видимости
let timerId = null;
// Кнопка Стоп неактивна
stopBtn.setAttribute('disabled', true);
// ------------------------------------------

// --- Блок обработки -----------------------
// ------------------------------------------

// Функция смены цвета
const changeColor = () => (bodyArea.style.backgroundColor = getRandomHexColor());
// ------------------------------------------

// Функция обработки кнопки Старт
const onStartClick = () => {
  // вызов changeColor для смены фона на 0й миллисекунде
  // сразу после нажатия кнопки старт.
  changeColor();

  // Старт неактивный, Стоп активный
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');

  // Запуск повторения смены цвета
  timerId = setInterval(changeColor, 1000);
};
// -------------------------------------------

// Функция обработки кнопки Стоп
const onStopClick = () => {
  // Старт активный, Стоп неактивный
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);

  // Остановка повторения смены цвета
  clearInterval(timerId);

  // Возврат белого цвета фона
  bodyArea.style.backgroundColor = '#FFFFFF';
};
// ------------------------------------------

// --- Слушатели ----------------------------
// ------------------------------------------
startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
// ------------------------------------------
