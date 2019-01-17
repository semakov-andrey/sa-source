'use strict';

export default class Icon {
  constructor() {
    const icons = document.getElementById('svg-sprite');
    if (icons) {
      const url = icons.dataset.path;

      const ajax = new XMLHttpRequest();
      ajax.open('GET', url, true);
      ajax.send();
      ajax.onload = () => {
        icons.innerHTML = ajax.responseText;
      };
    }
  }
}