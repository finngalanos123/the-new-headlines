import {environment} from '@env/environment';
import {Section} from '@core/models/section';

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

export const VOTE_TYPES = [
    {name: 'Important', displayName: 'Important', pages: ['Influence', 'Public']},
    {name: 'Interesting', displayName: 'Interesting', pages: ['Hobbyist', 'Science', 'Environment', 'Public']},
    {name: 'Investigate', displayName: 'Investigate', pages: ['Influence', 'Protest', 'Public']},
    {name: 'Protest', displayName: 'Protest', pages: ['Influence', 'Environment', 'Public']},
    {name: 'Like', displayName: 'Like', pages: ['Videos']},
    {name: 'Love', displayName: 'Love', pages: ['StyleAndSweat'], love: true},
    {name: 'TopClass', displayName: 'TopClass', pages: ['StyleAndSweat']},
    {name: 'Magic', displayName: 'Magic', pages: ['StyleAndSweat']},
    {name: 'LoveTheHuman', displayName: 'TheHuman', pages: ['HumanStories'], love: true},
    {name: 'Informative', displayName: 'Informative', pages: ['Hobbyist', 'Science']},
    {name: 'Protect', displayName: 'Protect', pages: ['Environment']},
    {name: 'Inspiring', displayName: 'Inspiring', pages: ['HumanStories']},
    {name: 'Promising', displayName: 'Promising', pages: ['JumpStartups']},
    {name: 'ProblemSolver', displayName: 'ProblemSolver', pages: ['JumpStartups']},
    {name: 'LoveTheColor', displayName: 'TheColor', pages: ['LoveDesigns'], love: true},
    {name: 'Grand', displayName: 'Grand', pages: ['LoveDesigns']},
    {name: 'Creative', displayName: 'Creative', pages: ['LoveDesigns']}
];
export const CONFIRM_DIALOG_SETTINGS = {autoFocus: true, width: '300px'};
export const MAT_TABLE_PAGINATION_VALUES = [5, 10, 25, 100];
export const SPINNER_DIAMETER = 30;
