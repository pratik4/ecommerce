import * as t from './actionTypes';
import api from 'lib/api';
import messages from 'lib/text';

function requestBanner() {
	return {
		type: t.BANNERS_REQUEST
	};
}

function receiveBanners(items) {
	return {
		type: t.BANNERS_RECEIVE,
		items
	};
}

function receiveErrorBanners(error) {
	return {
		type: t.BANNERS_FAILURE,
		error
	};
}

export function selectBanner(id) {
	return {
		type: t.BANNERS_SELECT,
		selectedId: id
	};
}

export function deselectBanner() {
	return {
		type: t.BANNERS_DESELECT
	};
}

function requestUpdateBanner(id) {
	return {
		type: t.BANNER_UPDATE_REQUEST
	};
}

function receiveUpdateBanner() {
	return {
		type: t.BANNER_UPDATE_SUCCESS
	};
}

function errorUpdateBanner(error) {
	return {
		type: t.BANNER_UPDATE_FAILURE,
		error
	};
}

function successCreateBanner(id) {
	return {
		type: t.BANNER_CREATE_SUCCESS
	};
}

function successDeleteBanner(id) {
	return {
		type: t.BANNER_DELETE_SUCCESS
	};
}

function successMoveUpDownBanner(newPosition) {
	return {
		type: t.BANNER_MOVE_UPDOWN_SUCCESS,
		position: newPosition
	};
}

function imageUploadStart() {
	return {
		type: t.BANNER_IMAGE_UPLOAD_START
	};
}

function imageUploadEnd() {
	return {
		type: t.BANNER_IMAGE_UPLOAD_END
	};
}

export function fetchBanners() {
	return dispatch => {
		dispatch(requestBanner());
		return api.banners
			.list()
			.then(({ status, json }) => {
				json.forEach((element, index, theArray) => {
					if (theArray[index].name === '') {
						theArray[index].name = `<${messages.draft}>`;
					}
				});
				dispatch(receiveBanners(json));
			})
			.catch(error => {
				dispatch(receiveErrorBanners(error));
			});
	};
}

function shouldFetchBanners(state) {
	const banners = state.banners;
	if (banners.isFetched || banners.isFetching) {
		return false;
	} else {
		return true;
	}
}

export function fetchBannersIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchBanners(getState())) {
			return dispatch(fetchBanners());
		}
	};
}

function sendUpdateBanner(id, data) {
	return dispatch => {
		dispatch(requestUpdateBanner(id));
		return api.banners
			.update(id, data)
			.then(({ status, json }) => {
				dispatch(receiveUpdateBanner());
				dispatch(fetchBanners());
			})
			.catch(error => {
				dispatch(errorUpdateBanner(error));
			});
	};
}

export function updateBanner(data) {
	return (dispatch, getState) => {
		return dispatch(sendUpdateBanner(data.id, data));
	};
}

export function createBanner() {
	return (dispatch, getState) => {
		return api.banners
			.create({ enabled: false })
			.then(({ status, json }) => {
				dispatch(successCreateBanner(json.id));
				dispatch(fetchBanners());
				dispatch(selectBanner(json.id));
			})
			.catch(error => {
				console.log(error);
			});
	};
}

export function deleteImage() {
	return (dispatch, getState) => {
		const state = getState();
		const bannerId = state.banners.selectedId;

		return api.banners
			.deleteImage(bannerId)
			.then(({ status, json }) => {
				if (status === 200) {
					dispatch(fetchBanners());
				} else {
					throw status;
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
}

export function deleteBanner(id) {
	return (dispatch, getState) => {
		return api.banners
			.delete(id)
			.then(({ status, json }) => {
				if (status === 200) {
					dispatch(successDeleteBanner(id));
					dispatch(deselectBanner());
					dispatch(fetchBanners());
				} else {
					throw status;
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
}

function moveBanner(allBanners = [], selectedBanner, isUp = true) {
	return new Promise((resolve, reject) => {
		if (isUp) {
			allBanners = allBanners
				.filter(
					e =>
						e.id !== selectedBanner.id && e.position < selectedBanner.position
				)
				.sort((a, b) => b.position - a.position);
		} else {
			allBanners = allBanners
				.filter(
					e =>
						e.id !== selectedBanner.id && e.position > selectedBanner.position
				)
				.sort((a, b) => a.position - b.position);
		}

		if (allBanners.length > 0) {
			let targetBanner = allBanners[0];
			let newPosition = targetBanner.position;

			api.banners
				.update(selectedBanner.id, { position: targetBanner.position })
				.then(() => {
					api.banners
						.update(targetBanner.id, { position: selectedBanner.position })
						.then(() => {
							resolve(newPosition);
						});
				})
				.catch(err => {
					reject(err);
				});
		}
	});
}

export function moveDownBanner() {
	return (dispatch, getState) => {
		var state = getState();
		var allBanners = state.banners.items;
		var selectedBanner = allBanners.find(
			item => item.id === state.banners.selectedId
		);
		var isUp = false;

		return moveBanner(allBanners, selectedBanner, isUp).then(newPosition => {
			dispatch(successMoveUpDownBanner(newPosition));
			dispatch(fetchBanners());
		});
	};
}

export function moveUpBanner() {
	return (dispatch, getState) => {
		let state = getState();
		var allBanners = state.banners.items;
		var selectedBanner = allBanners.find(
			item => item.id === state.banners.selectedId
		);

		var isUp = true;

		return moveBanner(allBanners, selectedBanner, isUp).then(newPosition => {
			dispatch(successMoveUpDownBanner(newPosition));
			dispatch(fetchBanners());
		});
	};
}

export function uploadImage(form) {
	return (dispatch, getState) => {
		const state = getState();
		const bannerId = state.banners.selectedId;
		dispatch(imageUploadStart());
		return api.banners
			.uploadImage(bannerId, form)
			.then(() => {
				dispatch(imageUploadEnd());
				dispatch(fetchBanners());
			})
			.catch(error => {
				dispatch(imageUploadEnd());
				console.log(error);
			});
	};
}
