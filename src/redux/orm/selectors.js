import { createSelector } from 'redux-orm';
import {schema} from './orm';

const getOneToOneRelationalObject = (obj) => {
    return obj? obj[0]: null
};


export const accountsSelector = createSelector(
    schema,
    state => state.orm,
    session => {
        const places = session.Place.withId(0);
        const account = session.Account.withId("ninjaTurtle");
        // console.log(account.games.toModelArray().map(g=>g.players.toRefArray().map(p=>p)));
        return session.Account.all().toModelArray().map((account,index)=> {
            // console.log(account.games.toModelArray().map(game => game.players.toRefArray().map(p=>p)));
            // console.log(account.games.toModelArray().map(game => game.places.toRefArray().map(p=>p)));

            const { ref } = account;
            
            // console.log(account.games.toRefArray().map(game => game.memo));
            // console.log(account.games.toRefArray().map(game => game.places));
            
            return {
                ...ref,
                // games: account.games.toRefArray().map(game => game.memo),
            };
        });
    }
);


export const accountSelectorOld = (username) => {
    return createSelector(
        schema,
        state => state.orm,
        session => {
            const account =  session.Account.withId(username);
            // console.log(account);
            if (account !== null ){
                // console.log(account.ref);
                return account.ref;
            }
           return null;
        }
    );
};

export const accountSelector = (accountId) => {
    return createSelector(
        schema,
        state => state.orm,
        session => {
            const account = session.Account.filter(a=>a.username===accountId).toModelArray().map(account => {
                const { ref } = account;
                // console.log("RRREEEFF: ",ref);
                // console.log(account);
                // Object.keys(ref) === ['id', 'name']
                const accountInfo = account.accountInfo.toRefArray().map(accountInfo => accountInfo);
                const competitorsInfo = account.competitorsInfo.toRefArray().map(competitorInfos => competitorInfos);
                const trophyIds = account.trophyIds.toRefArray().map(trophyIds => trophyIds);
                const trophies = account.trophies.toRefArray().map(trophies => trophies);
                const vies = account.vies.toRefArray().map(vies => vies);
                return {
                    ...ref,
                    accountInfo:accountInfo? accountInfo[0]: null,
                    competitorsInfo:competitorsInfo? competitorsInfo: null,
                    trophyIds:trophyIds? trophyIds: null,
                    trophies:trophies? trophies: null,
                    vies:vies? vies: null,
                    // places: game.places.toRefArray().map(place => {return{spot:place.spot,payout:place.payout} }),
                };
            });
            if (account !== null) {
                return account[0];
            }
            return null
        }
    );
}


export const onboardingSelector = createSelector(
    schema,
    state => state.orm,
    session => {
        const onboarding = session.Onboarding.withId(0);
        const { ref } = onboarding;
        return ref;
    }
);



export const newGameSelector = createSelector(
    schema,
    state => state.orm,
    session => {
        // const game = session.Game.withId(0).ref;
        // console.log("GAME", game);
        const game = session.Game.filter(g=>g.id===0);
        // console.log("GAME", game);
        return session.Game.filter(g=>g.id===0).toModelArray().map(game => {
            const { ref } = game;
            // Object.keys(ref) === ['id', 'name']
            return {
                ...ref,
                competitors: game.competitors.toRefArray().map(competitor => competitor.accountId),
                places: game.places.toRefArray().map(place => {return{spot:place.spot,payout:place.payout} }),
            };
        });
    }
);


export const gameSelector = (vieId) => {
    return createSelector(
        schema,
        state => state.orm,
        session => {
            const currentGame = session.Game.filter(g=>g.vieId===vieId).toModelArray().map(game => {
                const { ref } = game;
                return {
                    ...ref,
                    competitors: game.competitors.toRefArray().map(competitor => {return {id:competitor.id,accountId:competitor.accountId,staked:competitor.staked,submittedWinner:competitor.submittedWinner} }),
                    // places: game.places.toRefArray().map(place => {return{spot:place.spot,payout:place.payout, accountId: place.accountId} }),
                    podium: game.podium.toRefArray().map(place => {return{spot:place.spot,payout:place.payout, accountId: place.accountId, id:place.id} }),
                };
            });
            return currentGame && currentGame.length > 0 && currentGame[0];
        }
    );
}


export const competitorsSelector = createSelector(
        schema,
        state => state.orm,
        session => {
            return session.Competitor.all().toModelArray().map(competitor => {
                const { ref } = competitor;
                // console.log("HERE: ",ref);
                // return {
                //     ...ref,
                //     competitors: game.competitors.toRefArray().map(competitor => competitor),
                   
                // };
            });
        }
    );


export const gameHistorySelector = (gameId) => {
    return createSelector(
        schema,
        state => state.orm,
        session => {
            return session.Game.all().toModelArray().map(game => {
                const { ref } = game;
                return {
                    ...ref,
                    competitors: game.competitors.toRefArray().map(competitor => competitor.accountId),
                    places: game.places.toRefArray().map(place => {return{spot:place.spot,payout:place.payout, accountId: place.accountId} }),
                };
            });
        }
    );
}




export const editPlaceSelector = (id) => {
    return createSelector(
        schema,
        state => state.orm,
        session => {
            // const place  =  session.Place.withId(id);
             return session.Place.withId(id);
        }
    );
}
