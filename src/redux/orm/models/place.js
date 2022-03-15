import {  Model,attr,fk } from 'redux-orm';

export const ADD_SPOT = 'ADD_SPOT';
export const addSpot = (spot,payout,vieId) => {
    return {
        type: ADD_SPOT,
        payload: {
            spot,payout,vieId
        }
    };
};


export const UPDATE_PAYOUT = 'UPDATE_PAYOUT';
export const updatePayout = (payout,id) => {
    return {
        type: UPDATE_PAYOUT,
        payload: {
            payout,id
        }
    };
};


export const REMOVE_SPOT = 'REMOVE_SPOT';
export const removeSpot = (id) => {
    return {
        type: REMOVE_SPOT,
        payload: {
            id
        }
    };
};

export const UPDATE_ACCOUNT_ID = 'UPDATE_ACCOUNT_ID';
export const updateAccountId = (accountId,id) => {
    return {
        type: UPDATE_ACCOUNT_ID,
        payload: {
            accountId,id,
        }
    };
};


class Place extends Model{
    static reducer(action,Place,session){
        const { payload, type } = action;
        switch(type){
            case ADD_SPOT: {
                const {spot,payout,vieId} = payload;
                // Place.upsert({spot,payout,vieId});
                const exists = Place.exists({spot,payout,vieId});
                !exists && Place.create({spot,payout,vieId});
                break; 
            }
            case UPDATE_PAYOUT: {
                const {payout,id} = payload;
                 console.log("PAYLOAD: ", payload)
                // Place.withId(spot).set("payout",payout);
                Place.withId(id).set("payout",payout)
                break;
            }
            case REMOVE_SPOT: {
                const {id} = payload;
                Place.withId(id).delete();
                break;
            }
            case UPDATE_ACCOUNT_ID: {
                const {accountId,id} = payload;
                Place.withId(id).set("accountId",accountId);
                break;
            }

            break;
        }
    }
};

Place.modelName= 'Place';
// Place.options = {
//     idAttribute: 'spot',
// };

Place.fields = {
    id: attr(),
    spot: attr(),
    payout: attr(),
    accountId: attr(),
    // gameId: fk('Game', 'places'),
    vieId: fk('Game', 'podium'),
};

export default Place;