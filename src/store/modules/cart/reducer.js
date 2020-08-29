// AuthReducer.js
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

const INITIAL_STATE = {
  items: [],
};

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case '@cart/ADD':
          return {
            ...state,
            items: [...state.items, action.payload.item],
          };
        case '@cart/REMOVE':
          return {
            ...state,
            items: state.items.filter(item => item != action.payload.item),
          };
        case '@cart/CLEAR':
          return {
            ...state,
            items: [],
          };
        default:
            return state;
    }
};

const persistConfig = {
  key: 'cart',
  storage: AsyncStorage,
  blacklist: []
};

export default persistReducer(persistConfig, AuthReducer);