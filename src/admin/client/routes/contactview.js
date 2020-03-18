import React from 'react';
import { Route } from 'react-router-dom';
import ContactDetailView from 'modules/contacts/contactdetail';

const ContactDetails = props => {
	return (
		<div className="row row--no-gutter col-full-heigh scroll">
			<div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
				<ContactDetailView {...props} />
			</div>
		</div>
	);
};

export default ContactDetails;
