import EnquiryService from '../services/enquiry';
import security from '../lib/security';

class EnquiryRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/enquiry',
			security.checkUserScope.bind(this, security.scope.READ_BRANDS),

			this.getEnquiries.bind(this)
		);

		this.router.post(
			'/v1/enquiry',
			security.checkUserScope.bind(this, security.scope.WRITE_ENQUIRY),
			this.addEnquiry.bind(this)
		);

		this.router.delete(
			'/v1/enquiry/:id',
			security.checkUserScope.bind(this, security.scope.WRITE_BRANDS),
			this.deleteEnquiry.bind(this)
		);
	}

	getEnquiries(req, res, next) {
		EnquiryService.getEnquiries(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}

	deleteEnquiry(req, res, next) {
		EnquiryService.deleteEnquiry(req.params.id)
			.then(data => {
				res.status(data ? 200 : 404).end();
			})
			.catch(next);
	}

	addEnquiry(req, res, next) {
		EnquiryService.addEnquiry(req.body)
			.then(data => {
				res.status(data ? 200 : 400).end();
			})
			.catch(next);
	}
}

export default EnquiryRoute;
