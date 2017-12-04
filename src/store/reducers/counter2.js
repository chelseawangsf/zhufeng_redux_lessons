import * as types from '../action-types';
export default function (state = {number: 0}, action) {
  switch (action.type) {
    case types.INCREASE:
      return {number: state.number + 2}
    default:
      return state
  }
}