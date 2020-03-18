import { connect } from 'react-redux';

import {
	fetchContacts,
	selectContact,
	deselectContact,
	selectAllContacts,
	deselectAllContacts
} from '../actions';

import ContactsList from './components/list';

const mapStateToProps = state => {
	return {
		contacts: state.contacts.contacts,
		selected: state.contacts.selected
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoad: () => {
			dispatch(fetchContacts());
		},
		onSelect: event => {
			const contactId = event.target.value;
			const checked = event.target.checked;

			if (checked) {
				dispatch(selectContact(contactId));
			} else {
				dispatch(deselectContact(contactId));
			}
		},

		onSelectAll: event => {
			const checked = event.target.checked;

			if (checked) {
				dispatch(selectAllContacts());
			} else {
				dispatch(deselectAllContacts());
			}
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactsList);
