import { ObjectId } from 'mongodb';
import path from 'path';
import url from 'url';
import formidable from 'formidable';
import fse from 'fs-extra';
import settings from '../../lib/settings';
import { db } from '../../lib/mongo';
import utils from '../../lib/utils';
import parse from '../../lib/parse';
import settingsService from '../settings/settings';
import ProductsService from './products';
import { threadId } from 'worker_threads';
import { brotliCompress } from 'zlib';

class BrochureService {
	constructor() {}

	getBrochure(productId) {
		console.log('here in getBrochure');
		if (!ObjectId.isValid(productId)) {
			return Promise.reject('Invalid identifier');
		}
		const productIdObjectID = new ObjectId(productId);

		return settingsService.getSettings().then(generalSettings =>
			db
				.collection('products')
				.findOne({ _id: productIdObjectID }, { fields: { brochure: 1 } })
				.then(product => {
					if (product && product.brochure && product.brochure.length > 0) {
						let brochure = {
							filename: product.brochure
						};
						brochure.url = url.resolve(
							generalSettings.domain,
							settings.brochureUploadUrl +
								'/' +
								product._id +
								'/' +
								product.brochure
						);
						console.log('brochure_url', brochure);
						return brochure;
					} else {
						return '';
					}
				})
		);
	}

	deleteBrochure(productId) {
		let dir = path.resolve(settings.brochureUploadPath + '/' + productId);
		fse.emptyDirSync(dir);
		this.updateBrochure(productId, { brochure: '' });
	}

	updateBrochure(productId, data) {
		if (!ObjectId.isValid(productId)) {
			return Promise.reject('Invalid identifier');
		}
		console.log('updateBrochure', data);
		let productObjectID = new ObjectId(productId);

		return this.getValidDocumentForUpdate(productId, data)
			.then(brochureData =>
				db
					.collection('products')
					.updateOne({ _id: productObjectID }, { $set: brochureData })
			)
			.then(
				res => (res.modifiedCount > 0 ? this.getBrochure(productId) : null)
			);
	}

	getErrorMessage(err) {
		return { error: true, message: err.toString() };
	}

	getValidDocumentForUpdate(id, data) {
		return new Promise((resolve, reject) => {
			if (!ObjectId.isValid(id)) {
				reject('Invalid identifier');
			}
			if (Object.keys(data).length === 0) {
				reject('Required fields are missing');
			}

			let product = {};
			if (data.brochure !== undefined) {
				product.brochure = parse.getString(data.brochure);
			}
			console.log(product);
			resolve(product);
		});
	}

	uploadBrochure(req, res) {
		let productId = req.params.productId;

		let form = new formidable.IncomingForm(),
			file_name = null,
			file_size = 0;

		form
			.on('fileBegin', (name, file) => {
				let dir = path.resolve(settings.BrochureUploadPath + '/' + productId);
				fse.emptyDirSync(dir);
				file.name = utils.getCorrectFileName(file.name);
				file.path = dir + '/' + file.name;
			})
			.on('file', function(field, file) {
				// every time a file has been uploaded successfully,
				file_name = file.name;
				file_size = file.size;
			})
			.on('error', err => {
				res.status(500).send(this.getErrorMessage(err));
			})
			.on('end', () => {
				if (file_name) {
					this.updateBrochure(productId, { brochure: file_name });
					res.send({ file: file_name });
				} else {
					res
						.status(400)
						.send(this.getErrorMessage('Required fields are missing'));
				}
			});
		form.parse(req);
	}
}

export default new BrochureService();
