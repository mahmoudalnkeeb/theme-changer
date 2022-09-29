function createOverlay(btns, target) {
  target.style.position = 'relative';
  let overlay = document.createElement('div');
  overlay.classList.add('theme-changer-overlay');
  btns.forEach((btn) => overlay.appendChild(btn));
  return overlay;
}

function createBtns(themes, style) {
  let btns = [];
  themes.forEach((theme) => {
    let button = document.createElement('button');
    button.classList.add('theme-changer');
    button.setAttribute('data-change', theme.themeName);
    button.innerText = theme.themeName;
    button.style.background = theme.btnBg;
    button.style.color = theme.btnClr;
    btns.push(button);
  });
  style(themes);
  return btns;
}

function changeOnClick(target, btns) {
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      let theme = btn.dataset.change;
      target.dataset.theme = theme;
    });
  });
  return btns;
}

function appendVarsToStyle(themes) {
  let style = document.createElement('style');
  let innerText;
  themes.forEach((theme) => {
    innerText = '';
    innerText = `[data-theme='${theme.themeName}']{
        `;
    let keys = Object.keys(theme.themeVars);
    keys.forEach((key) => {
      innerText += `${key}:${theme.themeVars[key]};
      `;
    });
    innerText += `}
    `;
    style.innerHTML += innerText;
  });
  document.head.append(style);
}

/**
 *
 * @param {themes}  themes
 * @param {overlayStyle}  overlayStyles
 *
 */

function themeChanger(themes, overlayStyles) {
  let overlay = createOverlay;
  let evTobtns = changeOnClick;
  let btns = createBtns;
  let style = appendVarsToStyle;
  return (x) => overlay(evTobtns(x, btns(themes, style)), x);
}
