import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import Gallery from './imageUploadMultiple';
import MultiUploader from './uploader';

import messages from 'lib/text';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { EditorDragHandle } from 'material-ui/svg-icons';

class GeneralBrands extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			images: []
		};
	}

	onhandleDrop = (files, rejectedFiles) => {
		let form = new FormData();
		files.map(file => {
			form.append('image', file);
		});
		this.setState({
			images: form.getAll('image')
		});
		console.log(this.state);
		this.props.onUpload(this.state);
	};

	render() {
		const { image } = this.props;
		return <Dropzone onDrop={this.onhandleDrop}>drop here</Dropzone>;
	}
}

export default GeneralBrands;
