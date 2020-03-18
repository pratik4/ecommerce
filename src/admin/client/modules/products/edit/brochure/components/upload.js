import React from 'react';
import Dropzone from 'react-dropzone';
import messages from 'lib/text';

import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';

export default class uploader extends React.Component {
	onDrop = file => {
		let form = new FormData();
		form.append('file', file);
		this.props.onUpload(form);
	};

	render() {
		const { uploading } = this.props;
		return (
			<div>
				<Dropzone
					onDrop={this.onDrop}
					multiple={false}
					disableClick={true}
					ref={node => {
						this.dropzone = node;
					}}
					style={{}}
					className=""
					activeClassName=""
					rejectClassName=""
				>
					<div className="">
						{messages.help_dropHere}
						<FlatButton
							label={messages.chooseImage}
							className=""
							onClick={() => {
								this.dropzone.open();
							}}
						/>
					</div>
				</Dropzone>

				<Snackbar open={uploading} message={messages.messages_uploading} />
			</div>
		);
	}
}
