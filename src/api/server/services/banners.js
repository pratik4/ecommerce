import { ObjectID } from 'mongodb';
import path from 'path';
import url from 'url';
import formidable from 'formidable';
import fse from 'fs-extra';
import settings from '../lib/settings';
import SettingsService from './settings/settings';
import { db } from '../lib/mongo';
import utils from '../lib/utils';
import parse from '../lib/parse';

class BannersService {
	constructor() {}

	getFilter(params = {}) {
		let filter = {};
		const enabled = parse.getBooleanIfValid(params.end);
		if (enabled !== null) {
			filter.enabled = enabled;
		}
		const id = parse.getBooleanIfValid(params.id);
		if (id) {
			filter._id = id;
		}
		return filter;
	}

	async getBanners(params = {}) {
		const filter = this.getFilter(params);
		const projection = utils.getProjectionFromFields(params.field);
		const generalSettings = await SettingsService.getSettings();
		const domain = generalSettings.domain;
		const items = await db
			.collection('banners')
			.find(filter, { projection: projection })
			.sort({ position: 1 })
			.toArray();
		const result = items.map(banner => this.changeProperties(banner, domain));
		return result;
	}

	getSingleBanner(id) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('Invalid identifier');
		}
		return this.getBanners({ id: id }).then(banners => {
			return banners.length > 0 ? banners[0] : null;
		});
	}

	async addBanner(data) {
		const lastBanner = await db
			.collection('banners')
			.findOne({}, { sort: { position: -1 } });
		const newPosition =
			lastBanner && lastBanner.position > 0 ? lastBanner.position + 1 : 1;
		const dataToInsert = await this.getValidDocumentForInsert(
			data,
			newPosition
		);
		const InsertResult = await db
			.collection('banners')
			.insertMany([dataToInsert]);
		return this.getSingleBanner(InsertResult.ops[0]._id.toString());
	}

	updateBanner(id, data) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('invalid identifier');
		}
		let bannerObjectId = new ObjectID(id);
		return this.getValidDocumentForUpdate(id, data)
			.then(dataToSet =>
				db
					.collection('banners')
					.updateOne({ _id: bannerObjectId }, { $set: dataToSet })
			)
			.then(res => (res.modifiedCount > 0 ? this.getSingleBanner(id) : null));
	}

	deleteBanner(id) {
		if (!ObjectID.isValid(id)) {
			return Promise.reject('invalid Identifier');
		}

		const bannerObjectId = new ObjectID(id);
		return db
			.collection('banners')
			.deleteOne({ _id: bannerObjectId })
			.then(deleteResponse => {
				if (deleteResponse.deletedCount > 0) {
					let deleteDir = path.resolve(settings.bannersUploadPath + '/' + id);
					fse.remove(deleteDir, err => {});
				}
				return deleteResponse.deletedCount > 0;
			});
	}

	getErrorMessage(err) {
		return { error: true, message: err.toString() };
	}

	getValidDocumentForInsert(data, newPosition) {
		let banner = {
			date_created: new Date(),
			date_updated: null,
			image: ''
		};

		banner.name = parse.getString(data.name);
		banner.enabled = parse.getBooleanIfValid(data.enabled, true);
		banner.sort = parse.getString(data.sort);
		banner.position = parse.getNumberIfValid(data.position) || newPosition;

		return banner;
	}

	getValidDocumentForUpdate(id, data) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(id)) {
				reject('invalid identifier');
			}

			if (Object.keys(data).length === 0) {
				reject('Required fields are missing');
			}

			let banner = {
				date_updated: new Date()
			};

			if (data.name !== undefined) {
				banner.name = parse.getString(data.name);
			}
			if (data.enabled !== undefined) {
				banner.enabled = parse.getBooleanIfValid(data.enabled, true);
			}

			if (data.image !== undefined) {
				banner.image = data.image;
			}

			if (data.sort !== undefined) {
				banner.sort = data.sort;
			}

			if (data.position >= 0) {
				banner.position = data.position;
			}

			resolve(banner);
		});
	}

	changeProperties(item, domain) {
		if (item) {
			item.id = item._id.toString();
			item._id = undefined;

			if (item.image) {
				item.image = url.resolve(
					domain,
					`${settings.bannersUploadUrl}/${item.id}/${item.image}`
				);
			}
		}
		return item;
	}

	deleteBannerImage(id) {
		let dir = path.resolve(settings.bannersUploadPath + '/' + id);
		fse.emptyDirSync(dir);
		this.updateBanner(id, { image: '' });
	}

	uploadBannerImage(req, res) {
		let bannerId = req.params.id;
		let form = new formidable.IncomingForm(),
			file_name = null,
			file_size = 0;
		form
			.on('fileBegin', (name, file) => {
				// Emitted whenever a field / value pair been received.

				let dir = path.resolve(settings.bannersUploadPath + '/' + bannerId);

				fse.emptyDirSync(dir);
				file.name = utils.getCorrectFileName(file.name);
				file.path = dir + '/' + file.name;
			})
			.on('file', function(field, file) {
				//every time a file has been uploaded successfully,
				file_name = file.name;
				file_size = file.size;
			})
			.on('error', err => {
				res.status(500).send(this.getErrorMessage(err));
			})
			.on('end', () => {
				// Emitted when the entire request has been received, and all contained files have finished flushing to disk.
				if (file_name) {
					this.updateBanner(bannerId, { image: file_name });
					res.send({ file: file_name, size: file_size });
				} else {
					res
						.status(400)
						.send(this.getErrorMessage('Required fields are missing'));
				}
			});

		form.parse(req);
	}
}

export default new BannersService();
