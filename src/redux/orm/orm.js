import { ORM } from 'redux-orm';
import Game from './models/game';
import Account from './models/account';
import Onboarding from './models/onboarding';
import Competitor from './models/competitor';
import Place from './models/place';
import AccountInfo from './models/accountInfo';
import CompetitorInfo from './models/competitorInfo';
import Trophies from './models/trophies';
import Trophy from './models/trophy';
import Vie from './models/vie';

export const schema = new ORM({
    stateSelector: state => state.orm,
});

schema.register(
    Onboarding,
    Account,
    Game,
    Competitor,
    Place,
    AccountInfo,
    CompetitorInfo,
    Trophies,
    Trophy,
    Vie,
);

export default schema;