function creatLayout() {
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
    'Клавиатура создана в операционной системе MAC OS <br/> Для переключения языка комбинация: левыe ctrl + alt';
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
  for (i = 0; i < 13; i++) {
    keyboard_keys.append(BtnsCreater('normal'));
  }
  for (i = 0; i < 1; i++) {
    keyboard_keys.append(BtnsCreater('long'));
  }
  for (i = 0; i < 1; i++) {
    keyboard_keys.append(BtnsCreater('long'));
  }
  for (i = 0; i < 13; i++) {
    keyboard_keys.append(BtnsCreater('normal'));
  }
  for (i = 0; i < 1; i++) {
    keyboard_keys.append(BtnsCreater('long'));
  }
  for (i = 0; i < 11; i++) {
    keyboard_keys.append(BtnsCreater('normal'));
  }
  for (i = 0; i < 1; i++) {
    keyboard_keys.append(BtnsCreater('long'));
  }
  for (i = 0; i < 1; i++) {
    keyboard_keys.append(BtnsCreater('long'));
  }
  for (i = 0; i < 13; i++) {
    keyboard_keys.append(BtnsCreater('normal'));
  }

  for (i = 0; i < 4; i++) {
    keyboard_keys.append(BtnsCreater('normal'));
  }
  for (i = 0; i < 1; i++) {
    keyboard_keys.append(BtnsCreater('extra-long'));
  }
  for (i = 0; i < 5; i++) {
    keyboard_keys.append(BtnsCreater('normal'));
  }

  return SECTION_KEYBOARD;
}

let letter = 0;
function BtnsCreater(size) {
  let BTN = document.createElement('button');
  BTN.classList.add('keyboard_key');
  BTN.innerHTML = letter;
  if (size == 'long') {
    BTN.classList.add('keyboard_key-long');
  }
  if (size == 'extra-long') {
    BTN.classList.add('keyboard_key-extra-long');
  }
  letter++;
  return BTN;
}
console.log(document.querySelector('.keyboard'));
