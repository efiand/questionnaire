export default class Ranger {
  constructor(el: any) {
    const self: any = this;

    self.$el = el;
    self.bar = el.querySelector(`.ranger__bar`);
    self.control = el.querySelector(`.ranger__control`);

    self.applyValue();

    self.bar.addEventListener(`input`, () => self.applyValue());
  }

  applyValue() {
    const self: any = this;

    self.control.style.left = `${self.bar.value}%`;
  }
}
