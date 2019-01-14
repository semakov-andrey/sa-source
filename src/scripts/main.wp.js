'use strict';

require.context('../pages');
require.context('../images/svg');
import '../styles/main.scss';
import '../images/content/favicon-windows-150x150.png';
import '../images/content/android-chrome-192x192.png';
import '../images/content/android-chrome-512x512.png';

import '@babel/polyfill';
import Icon             from '../modules/icon/icon';
import Preloader        from '../modules/preloader/preloader';
import Burger           from '../modules/burger/burger';
import Modal            from '../modules/modal/modal';

new Icon();
new Preloader();
new Burger();
new Modal();