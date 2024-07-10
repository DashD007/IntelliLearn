import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import doubtReducer from "./doubtSlice.js"
import researchReducer from "./researchSlice.js";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    user:userReducer,
    doubt:doubtReducer,
    research:researchReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

let persistor = persistStore(appStore);

export {appStore,persistor};



// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice"
// import doubtReducer from "./doubtSlice.js"

// const appStore = configureStore({
//   reducer: {
//     user:userReducer,
//     doubt:doubtReducer,
//     research:researchReducer
//   }
// })

// export {appStore}