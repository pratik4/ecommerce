import { ObjectID } from 'mongodb';
import path from 'path';
import url from 'url';
import settings from '../lib/settings';
import { db } from '../lib/mongo';
import utils from '../lib/utils';
import parse from '../lib/parse';

class EnquiryService {
	constructor() {}

	async getEnquiries(params = {}) {
		const items = await db
			.collection('enquiries')
			.find()
			.toArray();

		return items;
	}

	async addEnquiry(data) {
		const InsertResult = await db.collection('enquiries').insertMany([data]);

		return InsertResult;
	}

	deleteEnquiry(id) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('Invalid Identifier');
		}
		const enquiryObjectId = new ObjectID(id);

		return db
			.collection('enquiries')
			.deleteOne({ _id: enquiryObjectId })
			.then(deleteResponse => {
				return deleteResponse.deletedCount > 0;
			});
	}
}

export default new EnquiryService();
