import { connect } from 'react-redux';
import {
	fetchEnquiries,
	selectEnquiry,
	deselectEnquiry,
	selectAllEnquiries,
	deselectAllEnquiries
} from '../actions';
import EnquiryList from './components/list';

const mapStateToProps = state => {
	return {
		enquiries: state.enquiries.enquiries,
		selected: state.enquiries.selected
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoad: () => {
			dispatch(fetchEnquiries());
		},
		onSelect: event => {
			const enquiryId = event.target.value;
			const checked = event.target.checked;

			if (checked) {
				dispatch(selectEnquiry(enquiryId));
			} else {
				dispatch(deselectEnquiry(enquiryId));
			}
		},
		onSelectAll: event => {
			const checked = event.target.checked;

			if (checked) {
				dispatch(selectAllEnquiries());
			} else {
				dispatch(deselectAllEnquiries());
			}
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EnquiryList);
