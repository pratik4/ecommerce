import { ObjectId } from 'mongodb';
import path from 'path';
import url from 'url';
import formidable from 'formidable';
import fse from 'fs-extra';
import settings from '../lib/settings';
import settingsService from './settings/settings';
import { db } from '../lib/mongo';
import utils from '../lib/utils';
import parse from '../lib/parse';
import { throws } from 'assert';

class BrandsService {
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

	async getBrands(params = {}) {
		const filter = this.getFilter(params);
		const projection = utils.getProjectionFromFields(params.fields);
		const generalSettings = await settingsService.getSettings();
		const domain = generalSettings.domain;
		const items = await db
			.collection('brands')
			.find(filter, { projection: projection })
			.sort({ position: 1 })
			.toArray();
		const result = items.map(brand => this.changeProperties(brand, domain));
		return result;
	}

	getSingleBrand(id) {
		if (!ObjectId.isValid(id)) {
			return Promise.reject('Invalid identifier');
		}
		return this.getBrands({ id: id }).then(brands => {
			return brands.length > 0 ? brands[0] : null;
		});
	}

	async addBrand(data) {
		const lastBrand = await db
			.collection('brands')
			.findOne({}, { sort: { position: -1 } });
		const newPosition =
			lastBrand && lastBrand.position > 0 ? lastBrand.position + 1 : 1;
		const dataToInsert = await this.getValidDocumentForInsert(
			data,
			newPosition
		);
		const insertResult = await db
			.collection('brands')
			.insertMany([dataToInsert]);
		return this.getSingleBrand(insertResult.ops[0]._id.toString());
	}

	updateBrand(id, data) {
		if (!ObjectId.isValid(id)) {
			return Promise.reject('invalid identifier');
		}
		let brandObjectId = new ObjectId(id);
		return this.getValidDocumentForUpdate(id, data)
			.then(dataToSet =>
				db
					.collection('brands')
					.updateOne({ _id: brandObjectId }, { $set: dataToSet })
			)
			.then(res => (res.modifiedCount > 0 ? this.getSingleBrand(id) : null));
	}

	deleteBrand(id) {
		if (!ObjectId.isValid(id)) {
			return Promise.reject('Invalid Identifier');
		}
		const brandObjectId = new ObjectId(id);
		return db
			.collection('brands')
			.deleteOne({ _id: brandObjectId })
			.then(deleteResponse => {
				if (deleteResponse.deletedCount > 0) {
					let deleteDir = path.resolve(settings.brandsUploadPath + '/' + id);
					fse.remove(deleteDir, err => {});
				}
				return deleteResponse.deletedCount > 0;
			});
	}

	getErrorMessage(err) {
		return { error: true, message: err.toString() };
	}

	getValidDocumentForInsert(data, newPosition) {
		// Allow empty brand to create draft
		let brand = {
			date_created: new Date(),
			date_updated: null,
			image: ''
		};

		brand.name = parse.getString(data.name);
		brand.enabled = parse.getBooleanIfValid(data.enabled, true);
		brand.sort = parse.getString(data.sort);
		brand.position = parse.getNumberIfValid(data.position) || newPosition;

		return brand;
	}

	getValidDocumentForUpdate(id, data) {
		return new Promise((resolve, reject) => {
			if (!ObjectId.isValid(id)) {
				reject('Invalid identifier');
			}
			if (Object.keys(data).length === 0) {
				reject('Required fields are missing');
			}

			let brand = {
				date_updated: new Date()
			};

			if (data.name !== undefined) {
				brand.name = parse.getString(data.name);
			}

			if (data.enabled !== undefined) {
				brand.enabled = parse.getBooleanIfValid(data.enabled, true);
			}

			if (data.image !== undefined) {
				brand.image = data.image;
			}

			if (data.sort !== undefined) {
				brand.sort = data.sort;
			}

			if (data.position >= 0) {
				brand.position = data.position;
			}

			resolve(brand);
		});
	}

	changeProperties(item, domain) {
		if (item) {
			item.id = item._id.toString();
			item._id = undefined;

			if (item.image) {
				item.image = url.resolve(
					domain,
					`${settings.brandsUploadUrl}/${item.id}/${item.image}`
				);
			}
		}

		return item;
	}

	deleteBrandImage(id) {
		let dir = path.resolve(settings.brandsUploadPath + '/' + id);
		fse.emptyDirSync(dir);
		this.updateBrand(id, { image: '' });
	}

	uploadBrandImage(req, res) {
		let brandId = req.params.id;
		let form = new formidable.IncomingForm(),
			file_name = null,
			file_size = 0;
		form
			.on('fileBegin', (name, file) => {
				// Emitted whenever a field / value pair been received.

				let dir = path.resolve(settings.brandsUploadPath + '/' + brandId);

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
					this.updateBrand(brandId, { image: file_name });
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

export default new BrandsService();
