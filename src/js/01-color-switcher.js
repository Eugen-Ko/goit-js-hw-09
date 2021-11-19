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
const onStartClick = () => {
  bodyArea.style.backgroundColor = getRandomHexColor();
  startBtn.setAttribute('disabled', true);
};

const onStopClick = () => {
  startBtn.removeAttribute('disabled');
};
// ------------------------------------------

// --- Слушатели ----------------------------
// ------------------------------------------
startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
// ------------------------------------------

