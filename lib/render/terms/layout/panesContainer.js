import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import PanesComponent from './panesComponent';

const PanesContainer = connect(
  (state, ownProps) => ({
    terms: state.termsManager.terms[ownProps.uid],
    render: ownProps.render
  })
)(PanesComponent);

export default PanesContainer;
