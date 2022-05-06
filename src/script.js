import {
  ENG_LOWER_CASE,
  ENG_UPPER_CASE,
  ENG_SHIFT_CASE,
  RUS_LOWER_CASE,
  RUS_UPPER_CASE,
  RUS_SHIFT_CASE,
  KEY_CODE_TABLE,
} from './keyboard.js';

let registerChoose = ENG_LOWER_CASE;
let lang = 'en';
let letter = 0;

const backspace = registerChoose[13];
const tab = registerChoose[14];
const capsLock = registerChoose[28];
const enter = registerChoose[40];
const leftShift = registerChoose[41];
const del = registerChoose[52];
const arrowUp = registerChoose[53];
const rightShift = registerChoose[54];
const fn = registerChoose[55];
const control = registerChoose[56];
const leftAlt = registerChoose[57];
const leftCommand = registerChoose[58];
const space = registerChoose[59];
const rightCommand = registerChoose[60];
const rightAlt = registerChoose[61];
const arrowLeft = registerChoose[62];
const arrowDown = registerChoose[63];
const arrowRight = registerChoose[64];

function creatTextareaSection() {
  const SECTION_SCREEN = document.createElement('section');
  SECTION_SCREEN.classList.add('print-screen');
  const TEXTAREA = document.createElement('textarea');
  TEXTAREA.classList.add('screen');
  SECTION_SCREEN.append(TEXTAREA);
  TEXTAREA.setAttribute('cols', '30');
  TEXTAREA.setAttribute('rows', '10');
  TEXTAREA.autofocus = true;
  return SECTION_SCREEN;
}
function btnsCreater(size) {
  const BTN = document.createElement('button');
  BTN.classList.add('keyboard_key');
  BTN.innerHTML = registerChoose[letter];
  if (size === 'long') {
    BTN.classList.add('keyboard_key-long');
  }
  if (size === 'extra-long') {
    BTN.classList.add('keyboard_key-extra-long');
  }
  if (BTN.innerHTML === capsLock) {
    BTN.classList.add('caps-lock');
  }
  if (BTN.innerHTML === leftCommand) {
    BTN.classList.add('meta-left');
  }
  if (BTN.innerHTML === rightCommand) {
    BTN.classList.add('meta-right');
  }
  if (BTN.innerHTML === del) {
    BTN.classList.add('del');
  }
  if (BTN.innerHTML === leftShift) {
    BTN.classList.add('shift-left');
  }
  if (BTN.innerHTML === rightShift) {
    BTN.classList.add('shift-right');
  }
  letter += 1;
  return BTN;
}

function creatKeyboardSection() {
  const SECTION_KEYBOARD = document.createElement('section');
  SECTION_KEYBOARD.classList.add('keyboard');
  const keyboardKeys = document.createElement('div');
  keyboardKeys.classList.add('keyboard_keys');
  SECTION_KEYBOARD.append(keyboardKeys);
  for (let i = 0; i < 65; i += 1) {
    if (i === 13 || i === 14 || i === 28 || i === 40 || i === 41) {
      keyboardKeys.append(btnsCreater('long'));
    } else if (i === 59) {
      keyboardKeys.append(btnsCreater('extra-long'));
    } else {
      keyboardKeys.append(btnsCreater('normal'));
    }
  }

  return SECTION_KEYBOARD;
}

function creatLayout() {
  // отрисовываю DOM
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
    'Клавиатура создана в операционной системе MAC OS <br/> Для переключения языка комбинация: option+space <br/> Для переключения языка мышкой: command';

  // добавляю функционал для caps lock
  const CAPS_LOCK = document.querySelector('.caps-lock');
  const COMMAND_LEFT = document.querySelector('.meta-left');
  const COMMAND_RIGHT = document.querySelector('.meta-right');
  const keyboardKeyArray = document.querySelectorAll('.keyboard_key');
  const SHIFT_LEFT = document.querySelector('.shift-left');
  const SHIFT_RIGHT = document.querySelector('.shift-right');
  const TEXTAREA_SCREEN = document.querySelector('.screen');

  function registerChanger() {
    CAPS_LOCK.classList.toggle('press');
    if (CAPS_LOCK.classList.contains('press')) {
      if (lang === 'en') {
        registerChoose = ENG_UPPER_CASE;
      } else {
        registerChoose = RUS_UPPER_CASE;
      }
    } else if (lang === 'en') {
      registerChoose = ENG_LOWER_CASE;
    } else {
      registerChoose = RUS_LOWER_CASE;
    }
    for (let i = 0; i < 65; i += 1) {
      if (
        i === 0 ||
        (i >= 15 && i <= 26) ||
        (i >= 29 && i <= 39) ||
        (i >= 42 && i <= 51)
      ) {
        keyboardKeyArray[i].innerHTML = registerChoose[i];
      }
    }
  }
  // добавляю функционал для смены языка
  function languageChange() {
    if (CAPS_LOCK.classList.contains('press')) {
      if (lang === 'en') {
        registerChoose = ENG_UPPER_CASE;
      } else {
        registerChoose = RUS_UPPER_CASE;
      }
    } else if (lang === 'en') {
      registerChoose = ENG_LOWER_CASE;
    } else {
      registerChoose = RUS_LOWER_CASE;
    }
    for (let i = 0; i < 65; i += 1) {
      if (
        i === 0 ||
        (i >= 15 && i <= 26) ||
        (i >= 29 && i <= 39) ||
        (i >= 42 && i <= 51)
      ) {
        keyboardKeyArray[i].innerHTML = registerChoose[i];
      }
    }
  }
  function languageSwitching() {
    lang === 'en' ? (lang = 'ru') : (lang = 'en');
    window.localStorage.setItem('lang', lang);
    languageChange();
  }

  // добавляю функционал для Shift
  function shiftSwitching() {
    if (lang === 'en') {
      registerChoose = ENG_SHIFT_CASE;
    } else {
      registerChoose = RUS_SHIFT_CASE;
    }

    for (let i = 0; i < 65; i += 1) {
      if (
        (i >= 0 && i <= 12) ||
        (i >= 15 && i <= 27) ||
        (i >= 29 && i <= 39) ||
        (i >= 42 && i <= 51)
      ) {
        keyboardKeyArray[i].innerHTML = registerChoose[i];
      }
    }
  }
  function anShiftSwitching() {
    if (lang === 'en') {
      registerChoose = ENG_LOWER_CASE;
    } else {
      registerChoose = RUS_LOWER_CASE;
    }
    if (CAPS_LOCK.classList.contains('press')) {
      if (lang === 'en') {
        registerChoose = ENG_UPPER_CASE;
      } else {
        registerChoose = RUS_UPPER_CASE;
      }
    }

    for (let i = 0; i < 65; i += 1) {
      if (
        (i >= 0 && i <= 12) ||
        (i >= 15 && i <= 27) ||
        (i >= 29 && i <= 39) ||
        (i >= 42 && i <= 51)
      ) {
        keyboardKeyArray[i].innerHTML = registerChoose[i];
      }
    }
  }

  CAPS_LOCK.addEventListener('click', registerChanger);
  COMMAND_LEFT.addEventListener('click', languageSwitching);
  COMMAND_RIGHT.addEventListener('click', languageSwitching);
  SHIFT_LEFT.addEventListener('mousedown', shiftSwitching);
  SHIFT_RIGHT.addEventListener('mousedown', shiftSwitching);
  SHIFT_LEFT.addEventListener('mouseup', anShiftSwitching);
  SHIFT_RIGHT.addEventListener('mouseup', anShiftSwitching);

  // эмуляция нажатия клавиш на вирт. клавиатуре
  function virtualKeyboardPress(code) {
    for (let i = 0; i < 65; i += 1) {
      if (KEY_CODE_TABLE[i] === code) {
        if (i === 28) {
          registerChanger();
        } else if (i === 41 || i === 54) {
          shiftSwitching();
          keyboardKeyArray[i].classList.add('press');
        } else {
          keyboardKeyArray[i].classList.add('press');
        }
      }
    }
  }
  function virtualKeyboardUnPress(code) {
    for (let i = 0; i < 65; i += 1) {
      if (KEY_CODE_TABLE[i] === code) {
        if (i === 28) {
          registerChanger();
        } else if (i === 41 || i === 54) {
          anShiftSwitching();
          keyboardKeyArray[i].classList.remove('press');
        } else {
          keyboardKeyArray[i].classList.remove('press');
        }
      }
    }
  }
  let altTime;
  let spaceTime;
  function changeLanguagePressTwoButtons(key, code) {
    if (key === 'Alt') {
      altTime = Date.now();
    }
    if (code === 'Space') {
      spaceTime = Date.now();
    }
    if (Math.abs(altTime - spaceTime) < 250) {
      languageSwitching();
    }
  }
  function showsTheCursorPosition(char) {
    const startPosition = TEXTAREA_SCREEN.selectionStart;
    const endPosition = TEXTAREA_SCREEN.selectionEnd;

    if (startPosition === endPosition) {
      TEXTAREA_SCREEN.focus();
      if (char === 1) {
        TEXTAREA_SCREEN.value =
          TEXTAREA_SCREEN.value.substr(0, startPosition) +
          TEXTAREA_SCREEN.value.substr(
            startPosition + 1,
            TEXTAREA_SCREEN.value.length
          );
        TEXTAREA_SCREEN.setSelectionRange(startPosition, endPosition);
      } else {
        TEXTAREA_SCREEN.value =
          TEXTAREA_SCREEN.value.substr(0, startPosition - 1) +
          TEXTAREA_SCREEN.value.substr(
            startPosition,
            TEXTAREA_SCREEN.value.length
          );
        TEXTAREA_SCREEN.setSelectionRange(startPosition - 1, endPosition - 1);
      }
    } else {
      TEXTAREA_SCREEN.value =
        TEXTAREA_SCREEN.value.substr(0, startPosition) +
        TEXTAREA_SCREEN.value.substr(endPosition, TEXTAREA_SCREEN.value.length);
      TEXTAREA_SCREEN.focus();
      TEXTAREA_SCREEN.setSelectionRange(
        startPosition,
        endPosition - (endPosition - startPosition)
      );
    }
  }
  // настройка кнопки Delete
  function delBtn() {
    showsTheCursorPosition(1);
  }
  // настройка кнопки Backspace
  function BackspaceBtn() {
    showsTheCursorPosition();
  }

  // переназначение клавиш клавиатуры
  document.addEventListener('keydown', (e) => {
    TEXTAREA_SCREEN.focus();
    virtualKeyboardPress(e.code);
    if (e.key === 'Alt' || e.code === 'Space') {
      changeLanguagePressTwoButtons(e.key, e.code);
    }

    try {
      e.preventDefault();
      if (e.key === 'Tab') {
        TEXTAREA_SCREEN.value += '   ';
      } else if (e.key === 'Enter') {
        TEXTAREA_SCREEN.value += '\n';
      } else if (e.code === 'Space') {
        TEXTAREA_SCREEN.value += ' ';
      } else if (
        e.key === 'Alt' ||
        e.key === 'Control' ||
        e.key === 'CapsLock' ||
        e.key === 'Shift' ||
        e.key === 'Meta'
      ) {
        TEXTAREA_SCREEN.value += '';
      } else if (e.key === 'ArrowUp') {
        TEXTAREA_SCREEN.value += '▲';
      } else if (e.key === 'ArrowDown') {
        TEXTAREA_SCREEN.value += '▼';
      } else if (e.key === 'ArrowLeft') {
        TEXTAREA_SCREEN.value += '◀';
      } else if (e.key === 'ArrowRight') {
        TEXTAREA_SCREEN.value += '▶';
      } else if (e.key === 'Backspace') {
        BackspaceBtn();
      } else if (e.key === 'Delete') {
        delBtn();
      } else {
        for (let i = 0; i < 65; i += 1) {
          if (
            (i >= 0 && i <= 12) ||
            (i >= 15 && i <= 27) ||
            (i >= 29 && i <= 39) ||
            (i >= 42 && i <= 51)
          ) {
            if (KEY_CODE_TABLE[i] === e.code) {
              TEXTAREA_SCREEN.value += registerChoose[i];
            }
          }
        }
      }
    } catch (i) {
      i;
    }
  });

  document.addEventListener('keyup', (e) => {
    TEXTAREA_SCREEN.focus();
    virtualKeyboardUnPress(e.code);
  });

  document.addEventListener('click', (e) => {
    TEXTAREA_SCREEN.focus();
    if (
      e.target.classList.contains('keyboard_key') ||
      e.target.classList.contains('material-icons')
    ) {
      const target = e.target.closest('.keyboard_key');
      if (target.innerHTML === tab) {
        TEXTAREA_SCREEN.value += '   ';
      } else if (target.innerHTML === enter) {
        TEXTAREA_SCREEN.value += '\n';
      } else if (target.innerHTML === space) {
        TEXTAREA_SCREEN.value += ' ';
      } else if (
        target.innerHTML === leftAlt ||
        target.innerHTML === rightAlt ||
        target.innerHTML === control ||
        target.innerHTML === capsLock ||
        target.innerHTML === leftShift ||
        target.innerHTML === rightShift ||
        target.innerHTML === leftCommand ||
        target.innerHTML === rightCommand ||
        target.innerHTML === fn
      ) {
        TEXTAREA_SCREEN.value += '';
      } else if (target.innerHTML === arrowUp) {
        TEXTAREA_SCREEN.value += '▲';
      } else if (target.innerHTML === arrowDown) {
        TEXTAREA_SCREEN.value += '▼';
      } else if (target.innerHTML === arrowLeft) {
        TEXTAREA_SCREEN.value += '◀';
      } else if (target.innerHTML === arrowRight) {
        TEXTAREA_SCREEN.value += '▶';
      } else if (target.innerHTML === backspace) {
        BackspaceBtn();
      } else if (target.innerHTML === del) {
        delBtn();
      } else {
        TEXTAREA_SCREEN.value += target.innerHTML;
      }
    }
  });
  function getLocalStorage() {
    lang = localStorage.getItem('lang');
    languageChange();
  }
  window.addEventListener('load', getLocalStorage);

  window.addEventListener('onload', () => {
    TEXTAREA_SCREEN.focus();
  });
}

document.addEventListener('DOMContentLoaded', creatLayout);
