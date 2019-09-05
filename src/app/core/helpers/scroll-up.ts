import IsResponsive from './is-responsive';

export default class ScrollUp {
    static do() {
        if (IsResponsive.check()) {
            let container = document.querySelector('#home_carousel');

            setTimeout(() => {
                container.scrollIntoView({block: 'start', behavior: 'smooth'});
            });
        } else {
            let container = document.querySelector('.navbar');
            container.scrollIntoView({block: 'start', behavior: 'smooth'});
        }
    }
}
