import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productCategories from 'modules/productCategories/reducer';
import products from 'modules/products/reducer';
import settings from 'modules/settings/reducer';
import apps from 'modules/apps/reducer';
import brands from 'modules/brands/reducer';
import pages from 'modules/pages/reducer';
import banners from 'modules/banners/reducer';
import enquiries from 'modules/enquiry/reducer';
import contacts from 'modules/contacts/reducer';

export default combineReducers({
	form: formReducer,
	productCategories,
	products,
	settings,
	apps,
	pages,
	brands,
	banners,
	enquiries,
	contacts
});
