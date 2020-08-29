import createSecureStore from "redux-persist-expo-securestore";

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { AsyncStorage } from 'react-native';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './modules/rootReducer'; // the value from combineReducers

const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);