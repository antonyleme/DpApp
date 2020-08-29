// AuthReducer.js
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

const INITIAL_STATE = {
  user: null,
  token: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case '@auth/LOGIN':
          return {
            ...state,
            user: action.payload.currentUser,
            token: action.payload.token, 
          };
        case '@auth/LOGOUT':
          return {
            ...state,
            user: null,
            token: null, 
          };
        case '@auth/UPDATEUSER':
          return {
            ...state,
            user: action.payload.user,
          };
        default:
            return state;
    }
};

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: []
};

export default persistReducer(persistConfig, AuthReducer);