import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

const Fragment = React.Fragment;

export default class Buttons extends React.Component {
	constructor(props) {
		super(props);
	}

	deleteEnquiry = () => {
		this.props.onDelete();
	};

	render() {
		const { selectedCount, onDelete } = this.props;

		return (
			<Fragment>
				{selectedCount > 0 && (
					<Fragment>
						<IconButton
							touch={true}
							tooltipPosition="bottom-left"
							tooltip="delete Enquiry"
							onClick={this.deleteEnquiry}
						>
							<FontIcon color="#fff" className="material-icons">
								delete
							</FontIcon>
						</IconButton>
					</Fragment>
				)}
			</Fragment>
		);
	}
}
