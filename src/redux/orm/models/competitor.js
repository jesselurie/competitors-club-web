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
                //check if competitor id and vie id exists 
                const exists = Competitor.exists({accountId,vieId});
                !exists && Competitor.create({accountId,vieId,isPending,place, payout});
                break;
            }
            case REMOVE_COMPETITOR: {
                const {id} = payload;
                console.log(id)
                Competitor.withId(id).delete()                
                break;
            }
            case PUT_COMPETITOR_STATE: {
                //For importing competitors staked information
                const {challengedCompetitor,accountId} = payload.data
                const {staked, submitted_winner, vie_id} = challengedCompetitor;
                Competitor.withId(accountId).set('staked',staked);
                Competitor.withId(accountId).set('submittedWinner',submitted_winner);
                break;
            }
            case SET_COMPETITOR_PLACE: {
                const {placeId,spot,payout, selectedPlayer} = payload.data
                Competitor.withId(selectedPlayer.id).set('place',spot);
                Competitor.withId(selectedPlayer.id).set('payout',payout);
                break;
            }
            break;
        }
    }
};

Competitor.modelName= 'Competitor';
Competitor.options = {
    idAttribute: 'accountId',
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