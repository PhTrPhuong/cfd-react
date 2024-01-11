import { applyMiddleware, combineReducers, createStore } from "redux";
import counterReducer from "./reducers/counterReducer";
import dogReducer from "./reducers/dogReducer";

const rootReducers = combineReducers({
    counter: counterReducer,
    dog: dogReducer,
});

const thunkMiddleware = (store) => (next) => (action) => {
    if (typeof action === "function") {
        action(store.dispatch);
        return;
    }
    next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
