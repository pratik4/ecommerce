import * as t from './actionTypes';

const initialState = {
	enquiries: [],
	selected: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.ENQUIRIES_RECEIVE:
			return Object.assign({}, state, { enquiries: action.enquiries });
		case t.ENQUIRY_SELECT:
			return Object.assign({}, state, {
				selected: [...state.selected, action.enquiryId]
			});
		case t.ENQUIRY_DESELECT:
			return Object.assign({}, state, {
				selected: state.selected.filter(_id => _id !== action.enquiryId)
			});
		case t.ENQUIRY_DESELECT_ALL:
			return Object.assign({}, state, {
				selected: []
			});
		case t.ENQUIRY_SELECT_ALL:
			let selected = state.enquiries.map(item => item._id);
			return Object.assign({}, state, {
				selected: selected
			});
		case t.CONTACT_VIEW:
			return Object.assign({}, state, { contactView: action.contactView });
		case t.ENQUIRY_DELETE_SUCCESS:
		default:
			return state;
	}
};
