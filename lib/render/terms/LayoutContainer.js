import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import LayoutComponent from './layoutComponent';

const LayoutContainer = connect(
  (state, ownProps) => ({
    terms: state.termsManager.terms[ownProps.layout.uid],
    childs: ownProps.layout.nodes,
    render: ownProps.render
  })
)(LayoutComponent);

export default LayoutContainer;
