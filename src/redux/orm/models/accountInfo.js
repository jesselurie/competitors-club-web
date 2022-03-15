import { Model,attr, fk } from 'redux-orm';

 export const ADD_ACCOUNT_INFO = 'ADD_ACCOUNT_INFO';
 export const addAccountInfo = ({
    consumers,
    data,
    nonce,
    providers,
},accountId) => { 
     return {
         type: ADD_ACCOUNT_INFO,
         payload: {
            consumers,
            data,
            nonce,
            providers,
            accountId
         }
     }
 }
////////////////////////////////
class AccountInfo extends Model{
    static reducer(action,AccountInfo,session){
        const { payload, type } = action;
        switch(type){
            case ADD_ACCOUNT_INFO: 
            const {
                consumers,
                data,
                nonce,
                providers,
                accountId
            } = payload;
            // console.log("AccountInfo: ",payload);
            AccountInfo.upsert({
                consumers,
                data,
                nonce,
                providers,
                accountId,
            });
            break;
        }
    }
};

//AccountInfo:  {
//     "consumers": 1,
//      "data": {
//          "feeFrozen": 0, 
//          "free": "0x00000000000000000000000000000000",
//          "miscFrozen": "0x00000000000000000000000000000000", 
//          "reserved": 0
//      }, 
//      "nonce": 0, 
//      "providers": 1
//    },

AccountInfo.modelName= 'AccountInfo';
AccountInfo.options = {
    idAttribute: 'accountId',
};

AccountInfo.fields = {
    id: attr(),
    consumers: attr(),
    data: attr(),
    nonce: attr(),
    providers: attr(),
    accountId: fk('Account', 'accountInfo'),
};

export default AccountInfo;

