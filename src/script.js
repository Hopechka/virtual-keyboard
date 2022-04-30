import {
  ENG_LOWER_CASE,
  ENG_UPPER_CASE,
  ENG_SHIFT_CASE,
  RUS_LOWER_CASE,
  RUS_UPPER_CASE,
  RUS_SHIFT_CASE,
} from './keyboard.js';

let registerChoose = ENG_LOWER_CASE;
let lang = 'en';
let letter = 0;

function creatLayout() {
  //отрисовываю DOM
  const CONTAINER = document.createElement('div');
  CONTAINER.classList.add('container');
  document.body.prepend(CONTAINER);
  const HEADER = document.createElement('header');
  const MAIN = document.createElement('main');
  const FOOTER = document.createElement('footer');
  CONTAINER.append(HEADER, MAIN, FOOTER);
  const HEADER_NAME = document.createElement('h1');
  HEADER.append(HEADER_NAME);
  HEADER_NAME.innerHTML = 'RSS Виртуальная клавиатура';
  MAIN.append(creatTextareaSection(), creatKeyboardSection());
  FOOTER.innerHTML =
    'Клавиатура создана в операционной системе MAC OS <br/> Для переключения языка комбинация: command+space';

  //добавляю функционал для caps lock
  let CAPS_LOCK = document.querySelector('.caps-lock');
  let COMMAND_LEFT = document.querySelector('.command-left');
  let COMMAND_RIGHT = document.querySelector('.command-right');
  let keyboard_key_array = document.querySelectorAll('.keyboard_key');
  let SHIFT_LIST = document.querySelectorAll('.shift');

  function registerChanger() {
    CAPS_LOCK.classList.toggle('active');
    if (CAPS_LOCK.classList.contains('active')) {
      lang == 'en'
        ? (registerChoose = ENG_UPPER_CASE)
        : (registerChoose = RUS_UPPER_CASE);
    } else {
      lang == 'en'
        ? (registerChoose = ENG_LOWER_CASE)
        : (registerChoose = RUS_LOWER_CASE);
    }
    for (let i = 0; i < 65; i++) {
      if (
        i == 0 ||
        (i >= 15 && i <= 26) ||
        (i >= 29 && i <= 39) ||
        (i >= 42 && i <= 51)
      ) {
        keyboard_key_array[i].innerHTML = registerChoose[i];
      }
    }
  }
  //добавляю функционал для смены языка
  function languageSwitching() {
    lang == 'en' ? (lang = 'ru') : (lang = 'en');
    if (CAPS_LOCK.classList.contains('active')) {
      lang == 'en'
        ? (registerChoose = ENG_UPPER_CASE)
        : (registerChoose = RUS_UPPER_CASE);
    } else {
      lang == 'en'
        ? (registerChoose = ENG_LOWER_CASE)
        : (registerChoose = RUS_LOWER_CASE);
    }
    for (let i = 0; i < 65; i++) {
      if (
        i == 0 ||
        (i >= 15 && i <= 26) ||
        (i >= 29 && i <= 39) ||
        (i >= 42 && i <= 51)
      ) {
        keyboard_key_array[i].innerHTML = registerChoose[i];
      }
    }
  }

  //добавляю функционал для Shift
  function shiftSwitching() {
    lang == 'en'
      ? (registerChoose = ENG_SHIFT_CASE)
      : (registerChoose = RUS_SHIFT_CASE);

    for (let i = 0; i < 65; i++) {
      if (
        (i >= 0 && i <= 12) ||
        (i >= 15 && i <= 27) ||
        (i >= 29 && i <= 39) ||
        (i >= 42 && i <= 51)
      ) {
        keyboard_key_array[i].innerHTML = registerChoose[i];
      }
    }
  }
  function anShiftSwitching() {
    if (CAPS_LOCK.classList.contains('active')) {
      lang == 'en'
        ? (registerChoose = ENG_UPPER_CASE)
        : (registerChoose = RUS_UPPER_CASE);
    } else {
      lang == 'en'
        ? (registerChoose = ENG_LOWER_CASE)
        : (registerChoose = RUS_LOWER_CASE);
    }

    for (let i = 0; i < 65; i++) {
      if (
        (i >= 0 && i <= 12) ||
        (i >= 15 && i <= 27) ||
        (i >= 29 && i <= 39) ||
        (i >= 42 && i <= 51)
      ) {
        keyboard_key_array[i].innerHTML = registerChoose[i];
      }
    }
  }

  CAPS_LOCK.addEventListener('click', registerChanger);
  COMMAND_LEFT.addEventListener('click', languageSwitching);
  COMMAND_RIGHT.addEventListener('click', languageSwitching);
  SHIFT_LIST[0].addEventListener('mousedown', shiftSwitching);
  SHIFT_LIST[1].addEventListener('mousedown', shiftSwitching);
  SHIFT_LIST[0].addEventListener('mouseup', anShiftSwitching);
  SHIFT_LIST[1].addEventListener('mouseup', anShiftSwitching);
}

document.addEventListener('DOMContentLoaded', creatLayout);

function creatTextareaSection() {
  const SECTION_SCREEN = document.createElement('section');
  SECTION_SCREEN.classList.add('print-screen');
  const TEXTAREA = document.createElement('textarea');
  TEXTAREA.classList.add('screen');
  SECTION_SCREEN.append(TEXTAREA);
  TEXTAREA.setAttribute('cols', '30');
  TEXTAREA.setAttribute('rows', '10');
  return SECTION_SCREEN;
}
function creatKeyboardSection() {
  const SECTION_KEYBOARD = document.createElement('section');
  SECTION_KEYBOARD.classList.add('keyboard');
  const keyboard_keys = document.createElement('div');
  keyboard_keys.classList.add('keyboard_keys');
  SECTION_KEYBOARD.append(keyboard_keys);
  for (let i = 0; i < 65; i++) {
    if (i == 13 || i == 14 || i == 28 || i == 40 || i == 41) {
      keyboard_keys.append(btnsCreater('long'));
    } else if (i == 59) {
      keyboard_keys.append(btnsCreater('extra-long'));
    } else {
      keyboard_keys.append(btnsCreater('normal'));
    }
  }

  return SECTION_KEYBOARD;
}

function btnsCreater(size) {
  let BTN = document.createElement('button');
  BTN.classList.add('keyboard_key');
  BTN.innerHTML = registerChoose[letter];
  if (size == 'long') {
    BTN.classList.add('keyboard_key-long');
  }
  if (size == 'extra-long') {
    BTN.classList.add('keyboard_key-extra-long');
  }
  if (BTN.innerHTML == 'caps lock') {
    BTN.classList.add('caps-lock');
  }
  if (BTN.innerHTML == 'shift') {
    BTN.classList.add('shift');
  }
  if (BTN.innerHTML == '<span class="material-icons">space_bar</span>') {
    BTN.classList.add('space');
  }
  if (
    BTN.innerHTML ==
    '<span class="material-icons left">keyboard_command_key</span>'
  ) {
    BTN.classList.add('command-left');
  }
  if (
    BTN.innerHTML ==
    '<span class="material-icons right">keyboard_command_key</span>'
  ) {
    BTN.classList.add('command-right');
  }
  if (
    BTN.innerHTML == '<span class="material-icons">keyboard_arrow_right</span>'
  ) {
    BTN.classList.add('right');
  }
  if (
    BTN.innerHTML == '<span class="material-icons">keyboard_arrow_left</span>'
  ) {
    BTN.classList.add('left');
  }
  if (
    BTN.innerHTML == '<span class="material-icons">keyboard_arrow_up</span>'
  ) {
    BTN.classList.add('up');
  }
  if (
    BTN.innerHTML == '<span class="material-icons">keyboard_arrow_down</span>'
  ) {
    BTN.classList.add('down');
  }
  letter++;
  return BTN;
}
