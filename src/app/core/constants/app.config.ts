import {environment} from '../../../environments/environment';

export const API_URL = environment.url;


export const MAIN_SECTIONS = [
    {name: 'Influence', link: '/home', tooltip: 'POLITICS,BUSINESS & OTHER INFLUENTIAL NEWS', dbName: 'Influence'},
    {name: 'Style And Sweat', link: '/style-and-sweat', tooltip: 'CINEMA,MUSIC,ARTS & SPORTS', dbName: 'StyleAndSweat'},
    {name: 'Hobbyist', link: '/hobbyist', tooltip: 'Bloggers', dbName: 'Hobbyist'},
    {name: 'Love Designs', link: '/love-designs', tooltip: 'Designs', dbName: 'LoveDesigns'},
    {name: 'Jump Startups', link: '/jump-startups', tooltip: 'Startup News', dbName: 'JumpStartups'},
    {name: 'Human Stories', link: '/human-stories', tooltip: 'Human Stories', dbName: 'HumanStories'},
    {name: 'Science', link: '/science', tooltip: 'Science & Tech', dbName: 'Science'},
    {name: 'Environment', link: '/environment', tooltip: 'Environment & Health', dbName: 'Environment'},
    {name: 'Public', link: '/public', tooltip: 'General News', dbName: 'Public'}
];
