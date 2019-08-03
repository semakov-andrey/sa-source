import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default class Modal {
  constructor() {
    this.modal = document.getElementById('modal');
    if (this.modal) this.events();
  }

  events() {
    const triggers = [...document.querySelectorAll('[data-modal]')];
    triggers.forEach(trigger => trigger.addEventListener('click', event => {
      event.preventDefault();
      const id = trigger.dataset.modal;
      if (id && id !== 'data-modal') {
        this.show(id);
      } else {
        this.hide();
      }
    }));
  }

  show(id) {
    const tab = document.getElementById(id);
    if (tab) tab.classList.add('modal__tab_active');
    this.modal.classList.add('modal_active');
    disableBodyScroll(this.modal);
  }

  hide() {
    this.modal.classList.remove('modal_active');
    enableBodyScroll(this.modal);
    setTimeout(() => {
      const tab = this.modal.querySelector('.modal__tab_active');
      if (tab) tab.classList.remove('modal__tab_active');
    }, 300);
  }
}