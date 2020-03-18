import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppBar from './components/appBar';

const mapStateToProps = state => {
	const productCategory = state.productCategories.items.find(
		item => item.id === state.productCategories.selectedId
	);

	return {
		productsSelectedCount: state.products.selected.length,
		enquiriesSelectedCount: state.enquiries.selected.length,

		productCategoryName: productCategory ? productCategory.name : null
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AppBar)
);
