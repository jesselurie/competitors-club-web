import { combineReducers } from 'redux';
import { createReducer } from 'redux-orm';
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// https://github.com/maxdeviant/redux-persist-transform-encrypt
import { encryptTransform } from 'redux-persist-transform-encrypt';
import {schema} from '../orm/orm';
import { isNewOrOperatorOrCompetitorReducer  as isNewOrOperatorOrCompetitor } from './isNewOrOperatorOrCompetitorReducer';
import {selectedAccountReducer as selectedAccount} from './selectedAccountReducer';
import {currentGameVieIdReducer as currentGameVieId} from './currentGameVieIdReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    transforms: [
        encryptTransform({
            secretKey: '123456789abcdefghijklmnopqrztuvwxyz',
            onError: (error)=> {
                // console.log("ENCRYPT ERROR: ", err);
                alert(error);
            },
        }),
    ]
};


export const rootReducer = combineReducers({
  orm: createReducer(schema),
  selectedAccount,
  isNewOrOperatorOrCompetitor,
  currentGameVieId
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
