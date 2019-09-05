import {environment} from '../../../environments/environment';
import {Section} from '../models/section';

export const API_URL = environment.url;


export const MAIN_SECTIONS: Section[] = [
    {name: 'Influence', route: '/home', tooltip: 'POLITICS,BUSINESS & OTHER INFLUENTIAL NEWS', dbName: 'Influence'},
    {
        name: 'Style And Sweat',
        route: '/style-and-sweat',
        tooltip: 'CINEMA,MUSIC,ARTS & SPORTS',
        dbName: 'StyleAndSweat'
    },
    {name: 'Hobbyist', route: '/hobbyist', tooltip: 'Bloggers', dbName: 'Hobbyist'},
    {name: 'Love Designs', route: '/love-designs', tooltip: 'Designs', dbName: 'LoveDesigns'},
    {name: 'Jump Startups', route: '/jump-startups', tooltip: 'Startup News', dbName: 'JumpStartups'},
    {name: 'Human Stories', route: '/human-stories', tooltip: 'Human Stories', dbName: 'HumanStories'},
    {name: 'Science', route: '/science', tooltip: 'Science & Tech', dbName: 'Science'},
    {name: 'Environment', route: '/environment', tooltip: 'Environment & Health', dbName: 'Environment'},
    {name: 'Public', route: '/public', tooltip: 'General News', dbName: 'Public'}
];
