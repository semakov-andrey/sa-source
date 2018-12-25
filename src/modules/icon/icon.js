'use strict';

export default class Icon {
  constructor() {
    let icons = document.getElementById('svg-sprite');
    if (icons) {
      let url = icons.dataset.path,
        ajax = new XMLHttpRequest();
      ajax.open('GET', url, true);
      ajax.send();
      ajax.onload = e => icons.innerHTML = ajax.responseText;
    }
  }
}