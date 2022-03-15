import { Model,attr,fk } from 'redux-orm';

 export const ADD_TROPHY_IDS = 'ADD_TROPHY_IDS';
 export const addTrophyIds = (ids,accountId) => { 
     return {
         type: ADD_TROPHY_IDS,
         payload: {
             ids,
             accountId
         }
     }
 }
////////////////////////////////
class Trophies extends Model{
    static reducer(action,Trophies,session){
        const { payload, type } = action;
        switch(type){
            case ADD_TROPHY_IDS: 
            const {
                ids,
                accountId
            } = payload;
            // console.log("TROPHY IDS: ",payload)
            ids.map(id=>{
                Trophies.upsert({
                    accountId,
                    classId:id[1][0],
                    tokenId:id[1][1]
                });
            });
            break;
        }
    }
};

// "Trophies":  [classId, tokenId] 
Trophies.modelName= 'Trophies';
Trophies.options = {
    idAttribute: 'tokenId',
};

Trophies.fields = {
    id: attr(),
    classId: attr(),
    tokenId: attr(),
    accountId: fk('Account', 'trophyIds'),
};

export default Trophies;

