import { connect } from 'react-redux';
import {
	updateBanner,
	deselectBanner,
	fetchBanners,
	deleteImage,
	uploadImage
} from '../actions';

import BannerEditForm from './components/edit';

const mapStateToProps = state => {
	return {
		uploadingImage: state.banners.uploadingImage,
		bannerId: state.banners.selectedId,
		isSaving: state.banners.isSaving,
		initialValues: state.banners.items.find(
			item => item.id === state.banners.selectedId
		)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onImageDelete: () => {
			dispatch(deleteImage());
		},
		onImageUpload: form => {
			dispatch(uploadImage(form));
		},
		onSubmit: values => {
			delete values.image;
			dispatch(updateBanner(values));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BannerEditForm);
