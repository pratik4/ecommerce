import React from 'react';
import Subheader from 'material-ui/Subheader';
import messages from 'lib/text';

const Head = ({ onSelectAll }) => (
	<Subheader>
		<div className="row row-no-gutter middle-xs">
			<div className="col-xs-8 col--no-gutter">
				<div className="row row-no-gutter middle-xs">
					<div className="col-xs-1 col--no-gutter">
						<input type="checkbox" onChange={onSelectAll} />
					</div>
					<div className="col-xs-5">Name</div>
					<div className="col-xs-6">Email</div>
				</div>
			</div>
			<div className="col-xs-4 col--no-gutter">Product</div>
		</div>
	</Subheader>
);
export default Head;
