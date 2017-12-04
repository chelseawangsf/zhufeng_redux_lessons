import * as types from '../action-types';
export default function (state = {number: 0}, action) {
  switch (action.type) {
    case types.INCREASE:
      return {number: state.number + 1}
    default:
      return state
  }
}