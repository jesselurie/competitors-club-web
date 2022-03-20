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

export const SET_PLACE_ACCOUNT_ID = 'SET_PLACE_ACCOUNT_ID';
export const setPlaceAccountId = (data) => {
    return {
        type: SET_PLACE_ACCOUNT_ID,
        payload: {
            data
        }
    };
};


export const RESET_PLACE = 'RESET_PLACE';
export const resetPlace = (data) => {
    return {
        type: RESET_PLACE,
        payload: {
            data
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
            case RESET_PLACE: {
                console.log("RESET PLACE")
                const {placeId,spot,payout, accountId, vieId} = payload.data;
                Place.withId(placeId).set("accountId","");
                session.Competitor.withId(accountId).set('place',0);
                session.Competitor.withId(accountId).set('payout',0);
                if(spot == 1) {
                    session.Game.withId(vieId).set('champion',"")
                }
              
                break;
            }
            case SET_PLACE_ACCOUNT_ID: {
                console.log("SET_PLACE_ACCOUNT_ID PLACE")
                const {placeId,spot,payout, accountId, vieId} = payload.data;
                const selectedPlace = Place.withId(placeId);
                console.log("PLACE: ",placeId,spot,payout, accountId, vieId);
                console.log("VIEID: ", vieId);
                console.log("spot: ", spot);
                console.log("payout: ", payout);
                console.log("selectedPlayer: ", accountId);
                // if (selectedPlace.accountId){
                    // const p = session.Competitor.get({accountId:selectedPlace.accountId})
                    // console.log("NOT NULL: ",placeId,spot,payout, selectedPlayer, vieId);
                    // console.log("NOT NULL: ",p);

                    //Place has already been selected for another competitor
                    //remove that competitors place and set to the new competitor 
                    // Place.withId(placeId).set("accountId","selectedPlayer.accountId");
                    // session.Competitor.withId(selectedPlayer.id).set('place',spot);
                    // session.Competitor.withId(selectedPlayer.id).set('payout',payout);
                    // if(spot == 1) {
                    //     session.Game.withId(vieId).set('champion',selectedPlayer.accountId)
                    // }
                // }else {
                Place.withId(placeId).set("accountId",accountId);
                session.Competitor.withId(accountId).set('place',spot);
                session.Competitor.withId(accountId).set('payout',payout);
                if(spot == 1) {
                    session.Game.withId(vieId).set('champion',accountId)
                }
                // }
                
              
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