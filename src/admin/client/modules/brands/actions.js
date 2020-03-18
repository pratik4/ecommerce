import * as t from './actionTypes';
import api from 'lib/api';
import messages from 'lib/text';

function requestBrand() {
	return {
		type: t.BRANDS_REQUEST
	};
}

function receiveBrands(items) {
	return {
		type: t.BRANDS_RECEIVE,
		items
	};
}

function receiveErrorBrands(error) {
	return {
		type: t.BRANDS_FAILURE,
		error
	};
}

export function selectBrand(id) {
	return {
		type: t.BRANDS_SELECT,
		selectedId: id
	};
}

export function deselectBrand() {
	return {
		type: t.BRANDS_DESELECT
	};
}

function requestUpdateBrand(id) {
	return {
		type: t.BRAND_UPDATE_REQUEST
	};
}

function receiveUpdateBrand() {
	return {
		type: t.BRAND_UPDATE_SUCCESS
	};
}

function errorUpdateBrand(error) {
	return {
		type: t.BRAND_UPDATE_FAILURE,
		error
	};
}

function successCreateBrand(id) {
	return {
		type: t.BRAND_CREATE_SUCCESS
	};
}

function successDeleteBrand(id) {
	return {
		type: t.BRAND_DELETE_SUCCESS
	};
}

function successMoveUpDownBrand(newPosition) {
	return {
		type: t.BRAND_MOVE_UPDOWN_SUCCESS,
		position: newPosition
	};
}

function imageUploadStart() {
	return {
		type: t.BRAND_IMAGE_UPLOAD_START
	};
}

function imageUploadEnd() {
	return {
		type: t.BRAND_IMAGE_UPLOAD_END
	};
}

export function fetchBrands() {
	return dispatch => {
		dispatch(requestBrand());
		return api.brands
			.list()
			.then(({ status, json }) => {
				json.forEach((element, index, theArray) => {
					if (theArray[index].name === '') {
						theArray[index].name = `<${messages.draft}>`;
					}
				});
				dispatch(receiveBrands(json));
			})
			.catch(error => {
				dispatch(receiveErrorBrands(error));
			});
	};
}

function shouldFetchBrands(state) {
	const brands = state.brands;
	if (brands.isFetched || brands.isFetching) {
		return false;
	} else {
		return true;
	}
}

export function fetchBrandsIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchBrands(getState())) {
			return dispatch(fetchBrands());
		}
	};
}

function sendUpdateBrand(id, data) {
	return dispatch => {
		dispatch(requestUpdateBrand(id));
		return api.brands
			.update(id, data)
			.then(({ status, json }) => {
				dispatch(receiveUpdateBrand());
				dispatch(fetchBrands());
			})
			.catch(error => {
				dispatch(errorUpdateBrand(error));
			});
	};
}

export function updateBrand(data) {
	return (dispatch, getState) => {
		return dispatch(sendUpdateBrand(data.id, data));
	};
}

export function createBrand() {
	return (dispatch, getState) => {
		return api.brands
			.create({ enabled: false })
			.then(({ status, json }) => {
				dispatch(successCreateBrand(json.id));
				dispatch(fetchBrands());
				dispatch(selectBrand(json.id));
			})
			.catch(error => {
				console.log(error);
			});
	};
}

export function deleteImage() {
	return (dispatch, getState) => {
		const state = getState();
		const brandId = state.brands.selectedId;

		return api.brands
			.deleteImage(brandId)
			.then(({ status, json }) => {
				if (status === 200) {
					dispatch(fetchBrands());
				} else {
					throw status;
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
}

export function deleteBrand(id) {
	return (dispatch, getState) => {
		return api.brands
			.delete(id)
			.then(({ status, json }) => {
				if (status === 200) {
					dispatch(successDeleteBrand(id));
					dispatch(deselectBrand());
					dispatch(fetchBrands());
				} else {
					throw status;
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
}

function moveBrand(allBrands = [], selectedBrand, isUp = true) {
	return new Promise((resolve, reject) => {
		if (isUp) {
			allBrands = allBrands
				.filter(
					e => e.id !== selectedBrand.id && e.position < selectedBrand.position
				)
				.sort((a, b) => b.position - a.position);
		} else {
			allBrands = allBrands
				.filter(
					e => e.id !== selectedBrand.id && e.position > selectedBrand.position
				)
				.sort((a, b) => a.position - b.position);
		}

		if (allBrands.length > 0) {
			let targetBrand = allBrands[0];
			let newPosition = targetBrand.position;

			api.brands
				.update(selectedBrand.id, { position: targetBrand.position })
				.then(() => {
					api.brands
						.update(targetBrand.id, { position: selectedBrand.position })
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

export function moveDownBrand() {
	return (dispatch, getState) => {
		var state = getState();
		var allBrands = state.brands.items;
		var selectedBrand = allBrands.find(
			item => item.id === state.brands.selectedId
		);

		var isUp = false;

		return moveBrand(allBrands, selectedBrand, isUp).then(newPosition => {
			dispatch(successMoveUpDownBrand(newPosition));
			dispatch(fetchBrands());
		});
	};
}

export function moveUpBrand() {
	return (dispatch, getState) => {
		let state = getState();
		var allBrands = state.brands.items;
		var selectedBrands = allBrands.find(
			item => item.id === state.brands.selectedId
		);

		var isUp = true;

		return moveBrand(allBrands, selectedBrands, isUp).then(newPosition => {
			dispatch(successMoveUpDownBrand(newPosition));
			dispatch(fetchBrands());
		});
	};
}

export function uploadImage(form) {
	return (dispatch, getState) => {
		const state = getState();
		const brandId = state.brands.selectedId;

		dispatch(imageUploadStart());
		return api.brands
			.uploadImage(brandId, form)
			.then(() => {
				dispatch(imageUploadEnd());
				dispatch(fetchBrands());
			})
			.catch(error => {
				dispatch(imageUploadEnd());
				console.log(error);
			});
	};
}
