import React from 'react';
import moment from 'moment';
import messages from 'lib/text';
import * as helper from 'lib/helper';
import DeleteConfirmation from 'modules/shared/deleteConfirmation';
import style from './style.css';
import Dropzone from 'react-dropzone';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { filter } from 'minimatch';
import { FlatButton } from 'material-ui';

const Fragment = React.Fragment;

const iconButtonElement = (
	<IconButton touch={true}>
		<FontIcon color="rgb(189, 189, 189)" className="material-icons">
			more_vert
		</FontIcon>
	</IconButton>
);

class FileItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brochureView: this.props.brochure.filename
				? this.props.brochure.filename
				: 'Upload Brochure'
		};
	}

	onDelete = () => {
		this.setState({
			brochureView: null
		});
		this.props.onBrochureDelete();
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			brochureView: nextProps.brochure.filename
		});
	}

	onDrop = (file, rejected) => {
		let form = new FormData();
		form.append('file', file[0]);
		this.props.onBrochureUpload(form);
	};

	render() {
		const { brochureView } = this.state;

		const hasbrochure =
			brochureView !== null &&
			brochureView !== '' &&
			brochureView !== 'Upload Brochure';
		const {
			product,
			productId,
			brochure,
			onBrochureDelete,
			onBrochureUpload,
			uploadingBrochure
		} = this.props;
		console.log(brochure);
		let htmlPreview = (
			<div className="row">
				<div className="col-xs-6">
					<div style={{ padding: `10px` }}>{brochureView}</div>
				</div>
				<div className="col-xs-2 offset-xs-2">
					<div className="">
						<IconButton
							touch={true}
							tooltip={messages.actions_upload}
							onClick={() => {
								this.dropzone.open();
							}}
							tooltipPosition="top-right"
						>
							<FontIcon color="rgba(0,0,0,0.5)" className="material-icons">
								file_upload
							</FontIcon>
						</IconButton>
						{hasbrochure && (
							<IconButton
								touch={true}
								tooltip={messages.actions_delete}
								onClick={this.onDelete}
								tooltipPosition="top-right"
							>
								<FontIcon color="rgba(0,0,0,0.5)" className="material-icons">
									delete
								</FontIcon>
							</IconButton>
						)}
					</div>
				</div>
			</div>
		);

		return (
			<Fragment>
				<Paper className="paper-box" zDepth={1}>
					<div className={style.innerBox}>
						<Dropzone
							onDrop={this.onDrop}
							multiple={false}
							disableClick={true}
							ref={node => {
								this.dropzone = node;
							}}
							style={{}}
						>
							{htmlPreview}
						</Dropzone>
					</div>
				</Paper>
			</Fragment>
		);
	}
}

export default FileItem;
