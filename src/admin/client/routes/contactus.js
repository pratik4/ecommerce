import React from 'react';
import ContactsList from 'modules/contacts/list';

export default () => (
	<div className="row row-no-gutter col-full-height scroll">
		<div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 col-md col-md-offset-1 col-lg-offset-2">
			<ContactsList />
		</div>
	</div>
);
