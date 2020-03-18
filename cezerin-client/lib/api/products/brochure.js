'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

var ProductBrochure = (function() {
	function ProductBrochure(client) {
		_classCallCheck(this, ProductBrochure);

		this.client = client;
	}

	_createClass(ProductBrochure, [
		{
			key: 'retrieve',
			value: function retrieve(productId) {
				return this.client.get('/products/' + productId + '/brochure');
			}
		},
		{
			key: 'upload',
			value: function upload(productId, formData) {
				return this.client.postFormData(
					'/products/' + productId + '/brochure',
					formData
				);
			}
		},
		{
			key: 'delete',
			value: function _delete(productId) {
				return this.client.delete('/products/' + productId + '/brochure');
			}
		},
		{
			key: 'download',
			value: function download(productId, productDataUrl) {
				return this.client.get('/product/' + productId + '/brochure/download');
			}
		}
	]);

	return ProductBrochure;
})();

exports.default = ProductBrochure;
