import React,{Component} from 'react';
import PropTypes from 'prop-types';
export class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
}
export const connect = (mapStateToProps, mapDispatchToState) => {
  return (_comp) => {
    class Proxy extends React.Component {
      static contextTypes = {
        store: PropTypes.object
      }
      constructor() {
        super();
      }

      componentWillMount() {
        this.setState({...mapStateToProps(this.context.store.getState())});
        this.unsubscribe = this.context.store.subscribe(() => {
          this.setState({...mapStateToProps(this.context.store.getState())});
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return (
          <_comp {...this.state} {...mapDispatchToState(this.context.store.dispatch)}></_comp>
        )
      }
    }
    return Proxy;
  }
}
