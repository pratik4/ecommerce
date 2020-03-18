import * as t from './actionTypes';
import api from 'lib/api';
import messages from 'lib/text';

function receiveEnquiries(enquiries) {
	return {
		type: t.ENQUIRIES_RECEIVE,
		enquiries
	};
}

export function fetchEnquiries() {
	return (dispatch, getState) => {
		return api.enquiry
			.list()
			.then(({ status, json }) => {
				dispatch(receiveEnquiries(json));
			})
			.catch(error => {});
	};
}

export function selectEnquiry(id) {
	return {
		type: t.ENQUIRY_SELECT,
		enquiryId: id
	};
}

export function deselectEnquiry(id) {
	return {
		type: t.ENQUIRY_DESELECT,
		enquiryId: id
	};
}

export function deselectAllEnquiries() {
	return {
		type: t.ENQUIRY_DESELECT_ALL
	};
}

export function selectAllEnquiries() {
	return {
		type: t.ENQUIRY_SELECT_ALL
	};
}

function deleteEnquiriesSuccess() {
	return {
		type: t.ENQUIRY_DELETE_SUCCESS
	};
}

export function deleteEnquiry() {
	return (dispatch, getState) => {
		const state = getState();
		let promises = state.enquiries.selected.map(enquiryId =>
			api.enquiry.delete(enquiryId)
		);

		return Promise.all(promises)
			.then(values => {
				dispatch(deleteEnquiriesSuccess());
				dispatch(deselectAllEnquiries());
				dispatch(fetchEnquiries());
			})
			.catch(err => {
				console.log(err);
			});
	};
}
