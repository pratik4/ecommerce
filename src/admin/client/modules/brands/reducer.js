import * as t from './actionTypes';

const initialState = {
	items: [],
	isFetched: false,
	isFetching: false,
	isSaving: false,
	uploadingImage: false,
	errorFetch: null,
	errorUpdate: null,
	selectedId: 'all'
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.BRANDS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});

		case t.BRANDS_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				isFetched: true,
				items: action.items
			});

		case t.BRANDS_FAILURE:
			return Object.assign({}, state, {
				errorFetch: action.error
			});

		case t.BRANDS_SELECT:
			return Object.assign({}, state, {
				selectedId: action.selectedId
			});

		case t.BRANDS_DESELECT:
			return Object.assign({}, state, {
				selectedId: null
			});

		case t.BRAND_UPDATE_REQUEST:
			return Object.assign({}, state, {
				isSaving: true
			});

		case t.BRAND_UPDATE_SUCCESS:
			return Object.assign({}, state, {
				isSaving: false
			});

		case t.BRAND_UPDATE_FAILURE:
			return Object.assign({}, state, {
				isSaving: false,
				errorUpdate: action.error
			});

		case t.BRAND_IMAGE_UPLOAD_START:
			return Object.assign({}, state, {
				uploadingImage: true
			});

		case t.BRAND_IMAGE_UPLOAD_END:
			return Object.assign({}, state, {
				uploadingImage: false
			});

		case t.BRAND_CREATE_SUCCESS:
		case t.BRAND_DELETE_SUCCESS:
		case t.BRAND_MOVE_UPDOWN_SUCCESS:
		default:
			return state;
	}
};
