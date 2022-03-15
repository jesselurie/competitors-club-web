import { createSelector } from 'redux-orm';
import {schema} from './models';

export const accounts = createSelector(schema.Account);

export const accountsSelector = createSelector(
    schema,
    state => state.orm,
    session => {
        // const places = session.Place.withId(0);
        // const account = session.Account.withId("ninjaTurtle");
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


export const accountSelector = (username) => {
    return createSelector(
        schema,
        state => state.orm,
        session => {
            const account = session.Account.withId(username);
            const { ref } = account;
            return ref;           
        }
    );
}

