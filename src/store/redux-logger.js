export default  ({dispatch, getState}) => next => action => {
  console.log('before',getState());
  next(action);
  console.log('after',getState());
}