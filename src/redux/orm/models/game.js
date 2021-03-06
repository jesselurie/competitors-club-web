import {  Model,attr,fk } from 'redux-orm';

 export const ADD_MEMO = 'ADD_MEMO';
 export const addMemo = (memo,currentGameVieId) => {
    return {
        type: ADD_MEMO,
        payload: {
            memo,
            currentGameVieId
        }
    };
};

 export const ADD_STAKE = 'ADD_STAKE';
 export const addStake = (stake,currentGameVieId) => {
    return {
        type: ADD_STAKE,
        payload: {
            stake,
            currentGameVieId
        }
    };
};

// export const CREATE_GAME = 'CREATE_GAME';
// export const createGame = (vieId) => {
//     return {
//         type :CREATE_GAME,
//         payload: {
//             vieId
//         }
//     }
// }


export const IMPORT_GAME = 'IMPORT_GAME';
export const importGame = (vieId,accountId,data) => {
    return {
        type :IMPORT_GAME,
        payload: {
            vieId,accountId,data
        }
    }
}

export const PUT_CURRENT_COMPETITOR = 'PUT_CURRENT_COMPETITOR';
export const putCurrentCompetitor = (data) => {
    return {
        type: PUT_CURRENT_COMPETITOR,
        payload: {
            data
        }
    };
};
////////////////////////////////
class Game extends Model{
    static reducer(action,Game,session){
        const { payload, type } = action;
        switch(type){
            case ADD_MEMO: {
                const {memo,currentGameVieId} = payload;
                // Game.withId(currentGameVieId).update({memo});
                Game.withId(currentGameVieId).set('memo',memo);
                break;
            }
            case ADD_STAKE: {
                const {stake,currentGameVieId} = payload;
                // console.log("HEREL ",stake,currentGameVieId);
                Game.withId(currentGameVieId).set('stake',stake);
                break;
            }
            case IMPORT_GAME: {
                const {vieId, accountId} = payload;
                const {competitors,date,memo,operator,podium,stake } = payload.data;
                // console.log("PAYLOAD: ",payload);
                const g = Game.upsert({
                    vieId,
                    operator,
                    stake,
                    date,
                    memo,
                    accountId,
                  });
                  podium.map((place)=>{
                      //check exists 
                    const exists = session.Place.exists({
                        spot:place.spot,
                        payout:place.payout,
                        vieId,
                    });
                   !exists && session.Place.create({
                        spot:place.spot,
                        payout:place.payout,
                        vieId,
                    });
                  });
                  competitors.map((competitor)=>{
                    const exists = session.Competitor.exists({
                        accountId: competitor,
                        vieId: vieId,
                    });
                    !exists && session.Competitor.create({
                        accountId: competitor,
                        vieId: vieId,
                      });
                  });

                break;
            }
            case PUT_CURRENT_COMPETITOR: {
                // const {accountId,staked,submittedWinner,vieId} = payload.data;
                const {data} = payload
                // console.log("PUT_COMPETITOR_STATE_FROM_REQUEST: ",data);
                Game.withId(data.vie_id).set('currentCompetitor',data);
                // Competitor.upsert({accountId,staked,submittedWinner,vieId});
                break;
            }
        }
    }
};

Game.modelName= 'Game';
Game.options = {
    idAttribute: 'vieId',
};

Game.fields = {
    id: attr(),
    vieId:attr(),
    stake: attr(),
    memo: attr(),  
    operator: attr(),
    time: attr(),
    currentCompetitor: attr(),
    champion: attr(),
    accountId: fk('Account', 'games'),
};

export default Game;