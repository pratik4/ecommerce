import { connect } from 'react-redux';
import { fetchContact } from '../actions';
import ContactDetailView from './contact';

const mapStateToProps = (state, ownProps) => {
	const { contactId } = ownProps.match.params;
	return {
		contactId: contactId,
		contactView: state.contacts.contactview
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onLoad: () => {
			const { contactId } = ownProps.match.params;

			if (contactId) {
				dispatch(fetchContact(contactId));
			}
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactDetailView);
