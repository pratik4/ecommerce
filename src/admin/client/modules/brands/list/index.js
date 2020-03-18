import { connect } from 'react-redux';
import { selectBrand, fetchBrandsIfNeeded } from '../actions';

import List from './components/list';
import { createBrands } from '../actions';

const mapStateToProps = state => {
	return {
		items: state.brands.items,
		selectedId: state.brands.selectedId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoad: () => {
			dispatch(fetchBrandsIfNeeded());
		},
		onSelect: brandId => {
			dispatch(selectBrand(brandId));
		},
		onCreate: () => {
			dispatch(createBrands());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
