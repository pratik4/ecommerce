import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { deleteContact } from '../actions';

import Buttons from './components/buttons';

const mapStateToProps = (state, ownProps) => {
	return {
		selectedCount: state.contacts.selected.length
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onDelete: () => {
			dispatch(deleteContact());
		}
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Buttons)
);
