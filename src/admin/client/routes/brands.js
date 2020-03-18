import React from 'react';
import BrandsEdit from 'modules/brands/edit';
import BrandsList from 'modules/brands/list';

export default () => (
	<div className="row row--no-gutter col-full-height">
		<div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
			<BrandsList showTrash={false} showAdd={true} />
		</div>
		<div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
			<BrandsEdit />
		</div>
	</div>
);
