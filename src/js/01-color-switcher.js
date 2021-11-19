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
// ------------------------------------------

// --- Блок обработки -----------------------
// ------------------------------------------

// Переменная таймера в глобальной зоне видимости
let timerId = null;
// Кнопка стоп неактивна
stopBtn.setAttribute('disabled', true);

// Функция смены цвета
const changeColor = () => bodyArea.style.backgroundColor = getRandomHexColor();

// Функция обработки кнопки Старт
const onStartClick = () => {
  // вызов changeColor для смены фона на 0й миллисекунде
  // сразу после нажатия кнопки старт.
  changeColor();
  // ----------
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(changeColor, 1000);
};

// Функция обработки кнопки Стоп
const onStopClick = () => {
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
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

