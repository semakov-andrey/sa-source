import '@babel/polyfill';
import cssVars          from 'css-vars-ponyfill';
import detection        from 'sa-polyfills/build/sa-detection';
import Icon             from '../modules/icon/icon';
import Preloader        from '../modules/preloader/preloader';
import Burger           from '../modules/burger/burger';
import Modal            from '../modules/modal/modal';

if (detection.isIE10Plus()) {
  cssVars({ onlyVars: true });
}

new Icon();
new Preloader();
new Burger();
new Modal();