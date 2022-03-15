import { Model,attr,fk } from 'redux-orm';

 export const ADD_COMPETITOR_INFO = 'ADD_COMPETITOR_INFO';
 export const addCompetitorInfo = ({
    staked,
    submitted_winner,
    vie_id,
},accountId) => { 
     return {
         type: ADD_COMPETITOR_INFO,
         payload: {
            staked,
            submittedWinner:submitted_winner,
            vieId:vie_id,
            accountId
         }
     }
 }
////////////////////////////////
class CompetitorInfo extends Model{
    static reducer(action,CompetitorInfo,session){
        const { payload, type } = action;
        switch(type){
            case ADD_COMPETITOR_INFO: 
            const {
                staked,
                submittedWinner,
                vieId,
                accountId
            } = payload;
            // console.log("CompetitorInfo: ",payload)
            CompetitorInfo.upsert({staked,submittedWinner,vieId,accountId});
            break;
        }
    }
};

// CompetitorInfo: {
//     "staked": false, 
//     "submitted_winner": false, 
//     "vie_id": "0x00000000000000000000000000000000"
// },

CompetitorInfo.modelName= 'CompetitorInfo';
CompetitorInfo.options = {
    idAttribute: 'vieId',
};

CompetitorInfo.fields = {
    id: attr(),
    staked: attr(),
    submittedWinner: attr(),
    vieId: attr(),
    accountId: fk('Account', 'competitorsInfo'),
};

export default CompetitorInfo;

