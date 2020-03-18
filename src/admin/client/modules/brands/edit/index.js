import { connect } from 'react-redux';
import {
	updateBrand,
	deselectBrand,
	fetchBrands,
	deleteImage,
	uploadImage
} from '../actions';

import BrandEditForm from './components/edit';

const mapStateToProps = state => {
	return {
		uploadingImage: state.brands.uploadingImage,
		brandId: state.brands.selectedId,
		isSaving: state.brands.isSaving,
		initialValues: state.brands.items.find(
			item => item.id === state.brands.selectedId
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
			console.log(values);
			dispatch(updateBrand(values));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandEditForm);
