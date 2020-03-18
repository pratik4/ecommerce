import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { deleteEnquiry } from '../actions';

import Buttons from './components/buttons';

const mapStateToProps = (state, ownProps) => {
	return {
		selectedCount: state.enquiries.selected.length
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onDelete: () => {
			dispatch(deleteEnquiry());
		}
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Buttons)
);
