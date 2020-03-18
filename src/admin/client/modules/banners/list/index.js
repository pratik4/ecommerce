import { connect } from 'react-redux';
import { selectBanner, fetchBannersIfNeeded } from '../actions';

import List from './components/list';
import { createBanner } from '../actions';

const mapStateToProps = state => {
	return {
		items: state.banners.items,
		selectedId: state.banners.selectedId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoad: () => {
			dispatch(fetchBannersIfNeeded());
		},
		onSelect: bannerId => {
			dispatch(selectBanner(bannerId));
		},
		onCreate: () => {
			dispatch(createBanner());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
