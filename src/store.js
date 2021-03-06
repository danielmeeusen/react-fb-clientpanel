import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// firebase config info no included in github repo for security reasons
import { firebaseConfig } from './firebaseConfig';
//reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Real time DB
};

// init firebase instance
firebase.initializeApp(firebaseConfig);

// init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

// check for settings in localStorage
if (localStorage.getItem('settings') == null) {
  // default settings
  const defaultSettings = {
    darkTheme: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // set to localStorage
  // only strings can be put into local storage hence JSON.stringify
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

const test = process.env.REACT_APP_SECRET_KEY;

// create initial state
// JSON.parse is used to return settings from a string to an object
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

// create store
let store;

if (process.env.NODE_ENV === 'development') {
  store = createStoreWithFirebase(
    rootReducer,
    initialState,
    reactReduxFirebase(firebase) + window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStoreWithFirebase(
    rootReducer,
    initialState,
    reactReduxFirebase(firebase)
  );
}

export default store;
