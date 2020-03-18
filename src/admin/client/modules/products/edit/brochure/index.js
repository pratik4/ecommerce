import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deleteBrochure, uploadBrochure } from '../../actions';

import Form from './components/form';

const mapStateToProps = (state, ownProps) => {
	const { productId } = ownProps.match.params;
	const oldBrochure = state.products.editProduct
		? state.products.editProduct.brochure
		: '';
	console.log('oldBrochure', oldBrochure);

	return {
		brochure: state.products.editProductBrochure || oldBrochure,
		uploadingBrochure: state.products.uploadingBrochure,
		productId: productId
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onBrochureDelete: () => {
			const { productId } = ownProps.match.params;
			console.log('productId', productId);
			dispatch(deleteBrochure(productId));
		},

		onBrochureUpload: form => {
			const { productId } = ownProps.match.params;
			dispatch(uploadBrochure(productId, form));
		}
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Form)
);
