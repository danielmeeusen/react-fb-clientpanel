import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyDQdZxiLKQuHoRgyKMz6qxaQ9UzwjpEZLc",
  authDomain: "react-client-panel-49a4a.firebaseapp.com",
  databaseURL: "https://react-client-panel-49a4a.firebaseio.com",
  projectId: "react-client-panel-49a4a",
  storageBucket: "react-client-panel-49a4a.appspot.com",
  messagingSenderId: "1002403928381"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// itit firebase instance
firebase.initializeApp(firebaseConfig);
// init firestore
// const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// create initial state
const initialState = {};

// create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
