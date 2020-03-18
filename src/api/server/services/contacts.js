import { ObjectID } from 'mongodb';
import path from 'path';
import url from 'url';
import settings from '../lib/settings';
import { db } from '../lib/mongo';
import utils from '../lib/utils';
import parse from '../lib/parse';

class ContactsService {
	constructor() {}

	getFilter(params = {}) {
		let filter = {};
		const id = parse.getObjectIDIfValid(params.id);
		if (id) {
			filter._id = new ObjectID(id);
		}
		return filter;
	}

	async getContacts(params = {}) {
		const filter = this.getFilter(params);
		const items = await db
			.collection('contacts')
			.find(filter)
			.toArray();
		return items;
	}

	getContact(id) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('Invalid Identifier');
		}
		return this.getContacts({ id: id }).then(contact => {
			return contact.length > 0 ? contact[0] : null;
		});
	}

	async addContact(data) {
		const InsertResult = await db.collection('contacts').insertMany([data]);

		return InsertResult;
	}

	deleteContact(id) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('invalid Identifier');
		}

		const contactObjectId = new ObjectID(id);

		return db
			.collection('contacts')
			.deleteOne({ _id: contactObjectId })
			.then(deleteResponse => {
				return deleteResponse.deletedCount > 0;
			});
	}
}

export default new ContactsService();
