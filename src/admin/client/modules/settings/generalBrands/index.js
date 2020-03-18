import React from 'react';
import { connect } from 'react-redux';
import { fetchSettings, updateSettings } from '../actions';
import GeneralBrands from './components/images';

const mapStateToProps = state => {
	const oldImages = state.settings.settings.images
		? state.settings.settings.images
		: [];
	return {
		images: oldImages,
		uploadingImages: state.settings.settings.uploadingImages
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onUpload: form => {
			dispatch(updateSettings(form));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GeneralBrands);
