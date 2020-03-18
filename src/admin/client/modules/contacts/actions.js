import * as t from './actionTypes';
import api from 'lib/api';
import messages from 'lib/text';

export function fetchContact(id) {
	return (dispatch, getState) => {
		return api.contactus
			.retrieve(id)
			.then(({ status, json }) => {
				dispatch(receiveContact(json));
			})
			.catch(error => {});
	};
}

function receiveContact(contactview) {
	return {
		type: t.CONTACT_VIEW,
		contactview
	};
}

function receiveContacts(contacts) {
	return {
		type: t.CONTACTUS_RECEIVE,
		contacts
	};
}

export function fetchContacts() {
	return (dispatch, getState) => {
		return api.contactus
			.list()
			.then(({ status, json }) => {
				dispatch(receiveContacts(json));
			})
			.catch(error => {
				console.log('error');
			});
	};
}

export function selectContact(id) {
	return {
		type: t.CONTACTUS_SELECT,
		contactId: id
	};
}

export function deselectContact(id) {
	return {
		type: t.CONTACTUS_DESELECT,
		contactId: id
	};
}

export function deselectAllContacts() {
	return {
		type: t.CONTACTUS_DESELECT_ALL
	};
}

export function selectAllContacts() {
	return {
		type: t.CONTACTUS_SELECT_ALL
	};
}

function deleteContactsSuccess() {
	return {
		type: t.CONTACTUS_DELETE_SUCCESS
	};
}

export function deleteContact() {
	return (dispatch, getState) => {
		const state = getState();
		let promises = state.contacts.selected.map(contactId =>
			api.contactus.delete(contactId)
		);

		return Promise.all(promises)
			.then(values => {
				dispatch(deleteContactsSuccess());
				dispatch(deselectAllContacts());
				dispatch(fetchContacts());
			})
			.catch(err => {
				console.log(err);
			});
	};
}
