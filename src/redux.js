export const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return {getState, dispatch, subscribe};
};
export const combineReducers = (reducers) => {
  return function (state = {}, action) {
    return Object.keys(reducers).reduce((curr, key) => {
      curr[key] = reducers[key](state[key], action);
      return curr;
    }, {});
  }
}

export const compose = (...fns) => {
  return arg => fns.reduceRight((item, next) => next(item), arg);
}

export const applyMiddleware = (...middlewares) => createStore => reducer => {
  let store = createStore(reducer);
  let dispatch = (action) => store.dispatch(action);
  middlewares = middlewares.map(middleware => middleware({dispatch, getState: store.getState}));
  dispatch = compose(...middlewares)(dispatch);
  return {
    ...store,
    dispatch
  }

}