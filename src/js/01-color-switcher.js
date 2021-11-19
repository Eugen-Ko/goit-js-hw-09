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

// Функция смены цвета
const changeColor = () => bodyArea.style.backgroundColor = getRandomHexColor();

// Функция обработки кнопки Старт
const onStartClick = () => {
  // вызов changeColor для смены фона на 0й миллисекунде
  // сразу после нажатия кнопки старт.
  bodyArea.style.backgroundColor = getRandomHexColor();
  // ----------
  startBtn.setAttribute('disabled', true);
  timerId = setInterval(changeColor, 1000);
};

// Функция обработки кнопки Стоп
const onStopClick = () => {
  startBtn.removeAttribute('disabled');
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

