import security from '../lib/security';
import BannersService from '../services/banners';

class BannersRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/banners',
			security.checkUserScope.bind(this, security.scope.READ_BANNERS),
			this.getBanners.bind(this)
		);
		this.router.post(
			'/v1/banners',
			security.checkUserScope.bind(this, security.scope.WRITE_BANNERS),
			this.addBanner.bind(this)
		);

		this.router.get(
			'/v1/banners/:id',
			security.checkUserScope.bind(this, security.scope.READ_BANNERS),
			this.getSingleBanner.bind(this)
		);

		this.router.put(
			'/v1/banners/:id',
			security.checkUserScope.bind(this, security.scope.WRITE_BANNERS),
			this.updateBanner.bind(this)
		);

		this.router.delete(
			'/v1/banners/:id',
			security.checkUserScope.bind(this, security.scope.WRITE_BANNERS),
			this.deleteBanner.bind(this)
		);

		this.router.post(
			'/v1/banners/:id/image',
			security.checkUserScope.bind(this, security.scope.WRITE_BANNERS),
			this.uploadBannerImage.bind(this)
		);

		this.router.delete(
			'/v1/banners/:id/image',
			security.checkUserScope.bind(this, security.scope.WRITE_BANNERS),
			this.deleteBannerImage.bind(this)
		);
	}

	getBanners(req, res, next) {
		BannersService.getBanners(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}

	getSingleBanner(req, res, next) {
		BannersService.getSingleBanner(req.param.id)
			.then(data => {
				if (data) {
					res.send(data);
				} else {
					res.status(404).end();
				}
			})
			.catch(next);
	}

	addBanner(req, res, next) {
		BannersService.addBanner(req.body)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}

	updateBanner(req, res, next) {
		BannersService.updateBanner(req.params.id, req.body)
			.then(data => {
				if (data) {
					res.send(data);
				} else {
					res.status(404).end();
				}
			})
			.catch(next);
	}

	deleteBanner(req, res, next) {
		BannersService.deleteBanner(req.params.id)
			.then(data => {
				console.log('data deleteBanner', data);
				res.status(data ? 200 : 404).end();
			})
			.catch(next);
	}

	uploadBannerImage(req, res, next) {
		BannersService.uploadBannerImage(req, res, next);
	}

	deleteBannerImage(req, res, next) {
		BannersService.deleteBannerImage(req.params.id);
		res.end();
	}
}

export default BannersRoute;
