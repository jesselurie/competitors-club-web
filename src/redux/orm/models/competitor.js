import {  Model,attr,fk } from 'redux-orm';

export const ADD_COMPETITOR = 'ADD_COMPETITOR';
export const addCompetitor = (accountId,vieId) => {
    return {
        type: ADD_COMPETITOR,
        payload: {
            accountId,
            vieId
        }
    };
};


export const REMOVE_COMPETITOR = 'REMOVE_COMPETITOR';
export const removeCompetitor = (id) => {
    return {
        type: REMOVE_COMPETITOR,
        payload: {
            id
        }
    };
};


export const PUT_COMPETITOR_STATE = 'PUT_COMPETITOR_STATE';
export const putCompetitorState = (data) => {
    return {
        type: PUT_COMPETITOR_STATE,
        payload: {
            data
        }
    };
};



export const SET_COMPETITOR_PLACE = 'SET_COMPETITOR_PLACE';
export const setCompetitorPlace = (data) => {
    return {
        type: SET_COMPETITOR_PLACE,
        payload: {
            data
        }
    };
};



////////////////////////////////
class Competitor extends Model{
    static reducer(action,Competitor,session){
        const { payload, type } = action;
        switch(type){
            case ADD_COMPETITOR: {
                const {accountId,vieId} = payload;
                const isPending = true;
                const place = 0;
                const payout = 0;
                // console.log("P: ",payload);
                //check if competitor id and vie id exists 
                const exists = Competitor.exists({accountId,vieId});
                !exists && Competitor.create({accountId,vieId,isPending,place, payout});
                break;
            }
            case REMOVE_COMPETITOR: {
                const {id} = payload;
                const c = Competitor.get({accountId:id});
                c.delete();
                // Competitor.withId(id).delete();
                break;
            }
            case PUT_COMPETITOR_STATE: {
                // const {accountId,staked,submittedWinner,vieId} = payload.data;
                const {data} = payload
                // console.log("PUT_COMPETITOR_STATE_FROM_REQUEST: ",data);
                // Competitor.upsert({accountId,staked,submittedWinner,vieId});
                break;
            }
            case SET_COMPETITOR_PLACE: {
                // const {accountId,staked,submittedWinner,vieId} = payload.data;
                const {placeId,spot,payout, selectedPlayer} = payload.data
                // console.log('COMPETITOR PLACE: ', placeId,spot,payout)
                Competitor.withId(selectedPlayer.id).set('place',spot);
                Competitor.withId(selectedPlayer.id).set('payout',payout);
                // console.log("PUT_COMPETITOR_STATE_FROM_REQUEST: ",data);
                // Competitor.upsert({accountId,staked,submittedWinner,vieId});
                break;
            }
            break;
        }
    }
};

Competitor.modelName= 'Competitor';
Competitor.options = {
    idAttribute: 'id',
};

Competitor.fields = {
    id: attr(),
    accountId: attr(),
    staked: attr(),
    submittedWinner: attr(),
    place: attr(),
    payout: attr(),
    isPending: attr(),
    vieId: fk('Game', 'competitors'),
};

export default Competitor;