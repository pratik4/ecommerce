import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset } from 'redux-form';
import {
	deleteBrand,
	moveUpBrand,
	moveDownBrand,
	createBrand
} from '../actions';

import BrandButton from './components/buttons';

const mapStateToProps = state => {
	return {
		selected: state.brands.items.find(
			item => item.id === state.brands.selectedId
		)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onMoveUp: () => {
			dispatch(moveUpBrand());
		},
		onMoveDown: () => {
			dispatch(moveDownBrand());
		},
		onDelete: id => {
			dispatch(deleteBrand(id));
			dispatch(reset('FormBrand'));
		},
		onCreate: () => {
			dispatch(createBrand());
		}
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(BrandButton)
);
