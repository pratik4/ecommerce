import * as t from './actionTypes';

const initialState = {
	contacts: [],
	selected: [],
	contactview: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.CONTACTUS_RECEIVE:
			return Object.assign({}, state, { contacts: action.contacts });
		case t.CONTACTUS_SELECT:
			return Object.assign({}, state, {
				selected: [...state.selected, action.contactId]
			});
		case t.CONTACT_VIEW:
			return Object.assign({}, state, {
				contactview: action.contactview
			});
		case t.CONTACTUS_DESELECT:
			return Object.assign({}, state, {
				selected: state.selected.filter(_id => _id !== action.contactId)
			});
		case t.CONTACTUS_DESELECT_ALL:
			return Object.assign({}, state, {
				selected: []
			});
		case t.CONTACTUS_SELECT_ALL:
			let selected = state.contacts.map(item => item._id);
			return Object.assign({}, state, {
				selected: selected
			});
		case t.CONTACTUS_DELETE_SUCCESS:
		default:
			return state;
	}
};
