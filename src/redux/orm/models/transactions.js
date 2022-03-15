import {  Model,attr,fk } from 'redux-orm';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const addTransaction = (accountId,transaction) => {
    return {
        type: ADD_TRANSACTION,
        payload: {
            accountId,
            transaction
        }
    };
};


////////////////////////////////
class Transaction extends Model{
    static reducer(action,Transaction,session){
        const { payload, type } = action;
        switch(type){
            case ADD_TRANSACTION: {
                const {accountId,transaction} = payload;
                Transaction.upsert({accountId,transaction});
                break;
            }
            break;
        }
    }
};

Transaction.modelName= 'Transaction';
Transaction.options = {
    idAttribute: 'id',
};

Transaction.fields = {
    id: attr(),
    accountId: attr(),
    transaction: attr(),
    accountId: fk('Account', 'transactions'),
};

export default Competitor;