import {  Model,attr,fk } from 'redux-orm';


export const ADD_VIE = 'ADD_VIE';
export const addVie = ({
    operator,
    stake,
    podium,
    date,
    competitors,
    memo,
}, vieId, accountId ) => { 
    return {
        type: ADD_VIE,
        payload: {
            vieId,
            operator,
            stake,
            podium,
            date,
            competitors,
            memo,
            accountId
        }
    }
}
////////////////////////////////
class Vie extends Model{
    static reducer(action,Vie,session){
        const { payload, type } = action;
        switch(type){
            case ADD_VIE: {
                const {
                    vieId,
                    operator,
                    stake,
                    podium,
                    date,
                    competitors,
                    memo,
                    accountId,
                } = payload;
                // console.log("VIE: ",payload)
                Vie.upsert(payload);
                break;
            }
            break;
        }
    }
};

Vie.modelName= 'Vie';
Vie.options = {
    idAttribute: 'vieId',
};
// "Vie": {
//     "operator": "AccountId",
//     "stake": "Balance",
//     "podium": "Vec<Place>",
//     "date": "Moment",
//     "competitors": "Vec<AccountId>",
//     "memo": "Vec<u8>"
//   },
//Use vie to create new game with the same data
//

Vie.fields = {
    id: attr(),
    vieId: attr(),
    operator: attr(),
    stake: attr(),
    podium: attr(),
    date: attr(),  
    competitors: attr(),
    memo: attr(),   
    accountId: fk('Account', 'vies'),
};

export default Vie;