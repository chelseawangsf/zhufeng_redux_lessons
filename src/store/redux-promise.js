let isPromise = (obj)=> obj.then;
export default ({dispatch, getState}) => next => action => (
  isPromise(action)?action.then(dispatch):next(action)
)
