export default class Message {
  constructor(el: any) {
    el.classList.add(`field__input--message-js`);

    el.addEventListener(`input`, () => {
      el.style.height = `${(el.value.split(`\n`).length + 1) * MESSAGE_LINE_HEIGHT}px`;
    });
  }
}
