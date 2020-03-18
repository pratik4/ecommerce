import ContactsService from '../services/contacts';
import security from '../lib/security';

class ContactRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/v1/contactus',
			security.checkUserScope.bind(this, security.scope.READ_BRANDS),
			this.getContacts.bind(this)
		);

		this.router.get(
			'/v1/contactus/:id',
			security.checkUserScope.bind(this, security.scope.READ_BRANDS),
			this.getContact.bind(this)
		);

		this.router.post(
			'/v1/contactus',
			security.checkUserScope.bind(this, security.scope.WRITE_ENQUIRY),
			this.addContact.bind(this)
		);
		this.router.delete(
			'/v1/contactus/:id',
			security.checkUserScope.bind(this, security.scope.WRITE_BRANDS),
			this.deleteContact.bind(this)
		);
	}

	getContacts(req, res, next) {
		ContactsService.getContacts(req.query)
			.then(data => {
				res.send(data);
			})
			.catch(next);
	}

	getContact(req, res, next) {
		ContactsService.getContact(req.params.id)
			.then(data => {
				if (data) {
					res.send(data);
				} else {
					res.status(404).end();
				}
			})
			.catch(next);
	}

	deleteContact(req, res, next) {
		ContactsService.deleteContact(req.params.id)
			.then(data => {
				res.status(data ? 200 : 404).end();
			})
			.catch(next);
	}

	addContact(req, res, next) {
		ContactsService.addContact(req.body)
			.then(data => {
				res.status(data ? 200 : 400).end();
			})
			.catch(next);
	}
}

export default ContactRoute;
