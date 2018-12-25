'use strict';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default class Preloader {
	constructor() {
		this.externalTime = 3000;
		this.internalTime = 500;
		this.origin = location.origin;
		this.preloader = document.getElementById('preloader');
		if(this.preloader) {
			this.show();
			let time = document.referrer !== '' && document.referrer.indexOf(this.origin) === 0 ? this.internalTime : this.externalTime;
			setTimeout(() => this.hide(), time);
		}
	}

	show() {
		this.preloader.classList.add('preloader_active');
		disableBodyScroll(this.preloader);
	}

	hide() {
		document.body.classList.remove('body_hidden');
		this.preloader.classList.remove('preloader_active');
		enableBodyScroll(this.preloader);
	}
}