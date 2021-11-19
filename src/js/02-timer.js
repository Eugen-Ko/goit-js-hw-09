// ------------------------------------------
// Импорт библиотек
// ------------------------------------------
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.2.min.css";

// --- Блок инициализации -------------------
// ------------------------------------------

const daysCounter = document.querySelector('[data-day]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

const fieldInput = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');

// Кнопка Старт неактивна
startBtn.setAttribute('disabled', true);

// --- Блок обработки -----------------------
// ------------------------------------------

// ------------------------------------------

// --- Слушатели ----------------------------
// ------------------------------------------
fieldInput.addEventListener('onfocus')
// ------------------------------------------