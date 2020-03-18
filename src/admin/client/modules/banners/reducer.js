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
		case t.BANNERS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});

		case t.BANNERS_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				isFetched: true,
				items: action.items
			});

		case t.BANNERS_FAILURE:
			return Object.assign({}, state, {
				errorFetch: action.error
			});

		case t.BANNERS_SELECT:
			return Object.assign({}, state, {
				selectedId: action.selectedId
			});

		case t.BANNERS_DESELECT:
			return Object.assign({}, state, {
				selectedId: null
			});

		case t.BANNER_UPDATE_REQUEST:
			return Object.assign({}, state, {
				isSaving: true
			});

		case t.BANNER_UPDATE_SUCCESS:
			return Object.assign({}, state, {
				isSaving: false
			});

		case t.BANNER_UPDATE_FAILURE:
			return Object.assign({}, state, {
				isSaving: false,
				errorUpdate: action.error
			});

		case t.BANNER_IMAGE_UPLOAD_START:
			return Object.assign({}, state, {
				uploadingImage: true
			});

		case t.BANNER_IMAGE_UPLOAD_END:
			return Object.assign({}, state, {
				uploadingImage: false
			});

		case t.BANNER_CREATE_SUCCESS:
		case t.BANNER_DELETE_SUCCESS:
		case t.BANNER_MOVE_UPDOWN_SUCCESS:
		default:
			return state;
	}
};
