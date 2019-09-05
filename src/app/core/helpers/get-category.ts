import {MAIN_SECTIONS} from '../constants/app.config';

export default class GetCategory {
    static get(url) {
        return MAIN_SECTIONS.filter(s => url === '/pages' ? s.dbName === 'Influence' : url.includes(s.route) )[0];

    }
}

