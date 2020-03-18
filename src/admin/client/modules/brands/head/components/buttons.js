import React from 'react';
import messages from 'lib/text';
import DeleteConfirmation from 'modules/shared/deleteConfirmation';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
const Fragment = React.Fragment;

export default class BrandButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openMoveTo: false,
			openDelete: false
		};
	}

	showMoveTo = () => {
		this.setState({ openMoveTo: true });
	};

	showDelete = () => {
		this.setState({ openDelete: true });
	};

	closeMoveTo = () => {
		this.setState({ openMoveTo: false });
	};

	closeDelete = () => {
		this.setState({ openDelete: false });
	};

	deleteBrand = () => {
		this.setState({ openDelete: false });
		this.props.onDelete(this.props.selected.id);
	};

	render() {
		const { selected, onMoveUp, onMoveDown, onDelete, onCreate } = this.props;

		const brandName =
			selected && selected.name && selected.name.length > 0
				? selected.name
				: 'Draft';

		return (
			<span>
				{selected && (
					<Fragment>
						<IconButton
							touch={true}
							tooltipPosition="bottom-left"
							tooltip={messages.actions_moveUp}
							onClick={onMoveUp}
						>
							<FontIcon color="#fff" className="material-icons">
								arrow_upward
							</FontIcon>
						</IconButton>
						<IconButton
							touch={true}
							tooltipPosition="bottom-left"
							tooltip={messages.actions_moveDown}
							onClick={onMoveDown}
						>
							<FontIcon color="#fff" className="material-icons">
								arrow_downward
							</FontIcon>
						</IconButton>
						<IconButton
							touch={true}
							tooltipPosition="bottom-left"
							tooltip={messages.actions_delete}
							onClick={this.showDelete}
						>
							<FontIcon color="#fff" className="material-icons">
								delete
							</FontIcon>
						</IconButton>
						<DeleteConfirmation
							open={this.state.openDelete}
							isSingle={true}
							itemsCount={1}
							itemName={brandName}
							onCancel={this.closeDelete}
							onDelete={this.deleteBrand}
						/>
					</Fragment>
				)}
				<IconButton
					touch={true}
					tooltipPosition="bottom-left"
					tooltip="add brand"
					onClick={onCreate}
				>
					<FontIcon color="#fff" className="material-icons">
						add
					</FontIcon>
				</IconButton>
			</span>
		);
	}
}
