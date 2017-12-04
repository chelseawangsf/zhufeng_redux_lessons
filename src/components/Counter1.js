import React,{Component} from 'react';
import {connect} from '../react-redux';
import * as types from '../store/action-types';
class Counter1 extends Component {
  render() {
    const {number, onIncreaseClick,onThunkIncreaseClick} = this.props
    return (
      <div>
        <span>{number}</span>
        <button onClick={onIncreaseClick}>加1</button>
        <button onClick={onThunkIncreaseClick}>3秒后加1</button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state.counter1;
}

function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch({type: types.INCREASE}),
    onThunkIncreaseClick: ()=>dispatch((dispatch)=>{
      setTimeout(function(){
        dispatch({type: types.INCREASE});
      },3000)
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter1)