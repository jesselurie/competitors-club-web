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

////////////////////////////////
class Competitor extends Model{
    static reducer(action,Competitor,session){
        const { payload, type } = action;
        switch(type){
            case ADD_COMPETITOR: {
                const {accountId,vieId} = payload;
                // console.log("P: ",payload);
                //check if competitor id and vie id exists 
                const exists = Competitor.exists({accountId,vieId});
                !exists && Competitor.create({accountId,vieId});
                break;
            }
            case REMOVE_COMPETITOR: {
                const {id} = payload;
                Competitor.withId(id).delete();
                break;
            }
            case PUT_COMPETITOR_STATE: {
                const {accountId,staked,submittedWinner,vieId, gameId} = payload.data;
                console.log("PUT_COMPETITOR_STATE_FROM_REQUEST: ",payload);
                Competitor.upsert({accountId,staked,submittedWinner,vieId,gameId});
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
    vieId: fk('Game', 'competitors'),
};

export default Competitor;