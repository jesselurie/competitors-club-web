import { createStore,applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist';
import { rootReducer,persistedReducer } from './reducers/index';
import schema from './orm/orm';
import bootstrap from './orm/bootstrap';


///const createStoreWithMiddleware =applyMiddleware(createLogger())(createStore);
const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(persistedReducer,bootstrap(schema));
// console.log(store.getState());

export const persistor = persistStore(store);

export default store;
// export default persistStore(store);
