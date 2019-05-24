export default class Message {
  constructor(el: any) {
    const self: any = this;
    self.$el = el;

    self.setHeight();
    el.addEventListener(`input`, () => self.setHeight());
    window.addEventListener(`resize`, () => self.setHeight());
  }

  setHeight() {
    const self: any = this;

    self.$el.style.height = `${Math.max(self.$el.clientHeight, self.$el.scrollHeight)}px`;
  }
}
