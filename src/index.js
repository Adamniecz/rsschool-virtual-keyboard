const keyboardRus = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
  'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];

const keyboardRusAddNumsSymbols = ['', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+'];

const keyboardEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
  'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];

const keyboardEngAddNumsSymbols = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];

let isRus = false;
let isEng = true;
let isPressedShift = false;
let isPressedAlt = false;
let isCapsLock = false;
const textTag = document.createElement('textarea');
const descriptionTag = document.createElement('div');
descriptionTag.innerHTML = 'Клавиатура создана на ОС Windows. Для смены языка использовать комбинацию Shift + Alt';
descriptionTag.classList.add('description');
const keyboardTag = document.createElement('div');
keyboardTag.classList.add('keyboard');
document.body.append(textTag);
document.body.append(descriptionTag);
document.body.append(keyboardTag);

function deleteAllEpmtyDivs() {
  const divs = document.querySelectorAll('div');

  divs.forEach((div) => {
    if (div.textContent === '') {
      div.remove();
    }
  });
}

function createKeyboard(langKeyboard) {
  document.querySelector('.keyboard').innerHTML = '';
  for (let i = 0; i < langKeyboard.length; i += 1) {
    const newKey = document.createElement('div');
    newKey.classList.add('key');
    const mainRusSymbol = document.createElement('div');
    mainRusSymbol.classList.add('main-rus');
    const mainEngSymbol = document.createElement('div');
    mainEngSymbol.classList.add('main-eng');
    const addRusSymbol = document.createElement('div');
    addRusSymbol.classList.add('add-rus');
    const addEngSymbol = document.createElement('div');
    addEngSymbol.classList.add('add-eng');
    const specSymbol = document.createElement('div');
    specSymbol.classList.add('spec-symbol');
    if (langKeyboard[i].length === 1 && (langKeyboard[i].match(/[a-zA-Z]/) || langKeyboard[i].match(/[а-яА-ЯёЁ]/))) {
      newKey.classList.add('letter');
    }
    if (langKeyboard[i] === 'Backspace'
      || langKeyboard[i] === 'Enter'
      || langKeyboard[i] === 'Shift'
      || langKeyboard[i] === 'CapsLock'
      || langKeyboard[i] === 'Tab'
      || langKeyboard[i] === 'Ctrl'
      || langKeyboard[i] === 'Alt'
      || langKeyboard[i] === 'Win') {
      specSymbol.textContent = langKeyboard[i];
      newKey.classList.add('spec-key');
    } else if (langKeyboard === keyboardRus) {
      mainRusSymbol.textContent = langKeyboard[i];
      if (keyboardRusAddNumsSymbols[i]) {
        addRusSymbol.textContent = keyboardRusAddNumsSymbols[i];
        newKey.classList.add('add-symbol');
      }
    } else {
      mainEngSymbol.textContent = langKeyboard[i];
      if (keyboardEngAddNumsSymbols[i]) {
        addEngSymbol.textContent = keyboardEngAddNumsSymbols[i];
        newKey.classList.add('add-symbol');
      }
    }
    if (langKeyboard[i] === 'Backspace'
      || langKeyboard[i] === 'Enter'
      || langKeyboard[i] === 'Shift'
      || langKeyboard[i] === 'CapsLock') {
      newKey.classList.add('double');
    }
    if (langKeyboard[i] === ' ') {
      newKey.classList.add('space');
    }
    if (langKeyboard[i] === 'Ctrl') {
      newKey.classList.add('control');
    }
    if (langKeyboard[i] === 'Alt') {
      newKey.classList.add('alt');
    }
    if (langKeyboard[i] === 'Shift') {
      newKey.classList.add('shift');
    }
    if (langKeyboard[i] === 'Win') {
      newKey.classList.add('win');
    }
    newKey.append(mainRusSymbol, addRusSymbol, mainEngSymbol, addEngSymbol, specSymbol);

    document.querySelector('.keyboard').append(newKey);
  }
  deleteAllEpmtyDivs();
}

createKeyboard(keyboardEng);

function pressCapsLock() {
  if (isCapsLock) {
    isCapsLock = false;
    document.querySelectorAll('.letter').forEach((letter) => {
      letter.innerHTML = letter.innerHTML.toLowerCase();
    });
  } else {
    isCapsLock = true;
    document.querySelectorAll('.letter').forEach((letter) => {
      letter.innerHTML = letter.innerHTML.toUpperCase();
    });
  }
}

function pressShift() {
  pressCapsLock();
}

function pressEnter() {
  const test = textTag.selectionStart;
  const startLength = textTag.value.length;
  textTag.value = `${textTag.value.slice(0, textTag.selectionStart)}\n${textTag.value.slice(textTag.selectionStart, textTag.value.length)}`;
  const endLength = textTag.value.length;
  textTag.selectionStart = textTag.selectionEnd = test + (endLength - startLength);
}

function pressTab() {
  const test = textTag.selectionStart;
  const startLength = textTag.value.length;
  textTag.value = `${textTag.value.slice(0, textTag.selectionStart)}\t${textTag.value.slice(textTag.selectionStart, textTag.value.length)}`;
  const endLength = textTag.value.length;
  textTag.selectionStart = textTag.selectionEnd = test + (endLength - startLength);
}

function pressBackspace() {
  const test = textTag.selectionStart - 1;
  if (textTag.selectionStart === 0) return;
  textTag.value = textTag.value.slice(0, textTag.selectionStart - 1)
    + textTag.value.slice(textTag.selectionStart, textTag.value.length);
  textTag.selectionStart = textTag.selectionEnd = test;
}

function pressSpace() {
  const test = textTag.selectionStart;
  textTag.value = `${textTag.value.slice(0, textTag.selectionStart)} ${textTag.value.slice(textTag.selectionStart, textTag.value.length)}`;
  textTag.selectionStart = textTag.selectionEnd = test + 1;
}

function pressUsualButton(button) {
  const test = textTag.selectionStart;
  textTag.value = textTag.value.slice(0, textTag.selectionStart) + button
    + textTag.value.slice(textTag.selectionStart, textTag.value.length);
  textTag.selectionStart = textTag.selectionEnd = test + 1;
}

keyboardTag.addEventListener('mousedown', (event) => {
  textTag.focus();
  const button = event.target.closest('.key');
  if (!button) return;
  if (button.innerText === 'CapsLock') {
    pressCapsLock();
  }
  if (button.textContent === 'Enter') {
    pressEnter();
  }
  if (button.textContent === 'Tab') {
    pressTab();
  }
  if (button.textContent === 'Backspace') {
    pressBackspace();
  }
  if (button.classList.contains('space')) {
    pressSpace();
    return;
  }
  if (button && !button.classList.contains('spec-key')) {
    pressUsualButton(button.innerText);
  }
});

keyboardTag.addEventListener('mousedown', (event) => {
  textTag.focus();
  const button = event.target.closest('.key');
  if (!button) return;
  if (button.innerText === 'Shift') {
    pressShift();
  }
});

keyboardTag.addEventListener('mouseup', (event) => {
  textTag.focus();
  const button = event.target.closest('.key');
  if (!button) return;
  if (button.innerText === 'Shift') {
    pressShift();
  }
});

function changeActiveClass(event, action) {
  const allButtons = document.querySelectorAll('.key');
  for (let i = 0; i < allButtons.length; i += 1) {
    if (event.code === 'ControlLeft') {
      document.querySelectorAll('.control')[0].classList[action]('active');
      break;
    }
    if (event.code === 'ControlRight') {
      document.querySelectorAll('.control')[1].classList[action]('active');
      break;
    }
    if (event.code === 'ShiftLeft') {
      document.querySelectorAll('.shift')[0].classList[action]('active');
      break;
    }
    if (event.code === 'ShiftRight') {
      document.querySelectorAll('.shift')[1].classList[action]('active');
      break;
    }
    if (event.code === 'AltLeft') {
      document.querySelectorAll('.alt')[0].classList[action]('active');
      break;
    }
    if (event.code === 'AltRight') {
      document.querySelectorAll('.alt')[1].classList[action]('active');
      break;
    }
    if (event.code === 'Space') {
      document.querySelector('.space').classList[action]('active');
      break;
    }
    if (event.code === 'MetaLeft') {
      document.querySelector('.win').classList[action]('active');
      break;
    }
    if (isCapsLock) {
      if (event.code === `Key${keyboardEng[i].toUpperCase()}` || event.key === allButtons[i].innerText) {
        allButtons[i].classList[action]('active');
        break;
      }
    } else if (event.code === `Key${keyboardEng[i].toUpperCase()}` || event.key === allButtons[i].innerText) {
      allButtons[i].classList[action]('active');
      break;
    }
  }
}

document.addEventListener('keydown', (event) => {
  textTag.focus();
  const button = event.key;
  event.preventDefault();
  changeActiveClass(event, 'add');
  if (button === 'CapsLock') {
    if (event.repeat) return;
    pressCapsLock();
    return;
  }
  if (button === 'Shift') {
    if (event.repeat) return;
    pressShift();
    isPressedShift = true;
    return;
  }
  if (event.code === 'AltLeft') {
    if (event.repeat) return;
    isPressedAlt = true;
    return;
  }
  if (button === 'Enter') {
    pressEnter();
    return;
  }
  if (button === 'Tab') {
    pressTab();
    return;
  }
  if (button === 'Backspace') {
    pressBackspace();
    return;
  }
  if (event.code === 'Space') {
    pressSpace();
    return;
  }
  if (button === 'ArrowLeft') {
    pressUsualButton('←');
    return;
  }
  if (button === 'ArrowUp') {
    pressUsualButton('↑');
    return;
  }
  if (button === 'ArrowRight') {
    pressUsualButton('→');
    return;
  }
  if (button === 'ArrowDown') {
    pressUsualButton('↓');
    return;
  }
  if (isEng) {
    for (let i = 0; i < keyboardEng.length; i += 1) {
      if ((event.code === `Key${keyboardEng[i].toUpperCase()}` || button === keyboardEng[i]) && button.length === 1) {
        if (isCapsLock) {
          pressUsualButton(keyboardEng[i].toUpperCase());
          break;
        } else {
          pressUsualButton(keyboardEng[i]);
          break;
        }
      }
    }
  }
  if (isRus) {
    for (let i = 0; i < keyboardRus.length; i += 1) {
      if ((event.code === `Key${keyboardEng[i].toUpperCase()}` || button === keyboardRus[i]) && button.length === 1) {
        if (isCapsLock) {
          pressUsualButton(keyboardRus[i].toUpperCase());
          break;
        } else {
          pressUsualButton(keyboardRus[i]);
          break;
        }
      }
    }
  }
});

document.addEventListener('keyup', (event) => {
  const button = event.key;
  event.preventDefault();
  changeActiveClass(event, 'remove');
  if (isPressedShift && isPressedAlt) {
    if (isEng) {
      createKeyboard(keyboardRus);
    } else {
      createKeyboard(keyboardEng);
    }
    isEng = !isEng;
    isRus = !isRus;
  }
  if (button === 'Shift') {
    pressShift();
    isPressedShift = false;
  }
  if (event.code === 'AltLeft') {
    isPressedAlt = false;
  }
});
