import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset } from 'redux-form';
import {
	deleteBanner,
	moveUpBanner,
	moveDownBanner,
	createBanner
} from '../actions';

import BannerButton from './components/buttons';

const mapStateToProps = state => {
	return {
		selected: state.banners.items.find(
			item => item.id === state.banners.selectedId
		)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onMoveUp: () => {
			dispatch(moveUpBanner());
		},
		onMoveDown: () => {
			dispatch(moveDownBanner());
		},
		onDelete: id => {
			dispatch(deleteBanner(id));
			dispatch(reset('FormBanner'));
		},
		onCreate: () => {
			dispatch(createBanner());
		}
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(BannerButton)
);
