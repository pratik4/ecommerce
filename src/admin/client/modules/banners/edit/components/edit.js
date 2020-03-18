import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Editor from 'modules/shared/editor';

import { CustomToggle } from 'modules/shared/form';
import ImageUpload from 'modules/shared/imageUpload';
import messages from 'lib/text';
import settings from 'lib/settings';
import api from 'lib/api';
import style from './style.css';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
	const errors = {};
	const requiredFields = ['name'];

	requiredFields.forEach(field => {
		if (values && !values[field]) {
			errors[field] = messages.errors_required;
		}
	});
	return errors;
};

const BannerEditForm = ({
	uploadingImage,
	handleSubmit,
	pristine,
	reset,
	submitting,
	onImageUpload,
	onImageDelete,
	isSaving,
	initialValues
}) => {
	let imageUrl = null;
	let bannerId = null;
	if (initialValues) {
		bannerId = initialValues.id;
		imageUrl = initialValues.image;
	}

	if (bannerId) {
		return (
			<React.Fragment>
				<Paper className="paper-box" zDepth={1}>
					<form onSubmit={handleSubmit}>
						<div className={style.innerBox}>
							<Field
								name="name"
								component={TextField}
								floatingLabelText="bannerId"
								fullWidth={true}
							/>
							<Field
								name="url"
								component={TextField}
								floatingLabelText="url"
								fullWidth={true}
							/>

							<div className={style.shortBox}>
								<Field
									name="enabled"
									component={CustomToggle}
									label={messages.enabled}
									className={style.toggle}
								/>
							</div>
						</div>
						<div
							className={
								'buttons-box ' +
								(pristine ? 'buttons-box-pristine' : 'buttons-box-show')
							}
						>
							<FlatButton
								label={messages.cancel}
								className={style.button}
								onClick={reset}
								disabled={pristine || submitting}
							/>
							<RaisedButton
								type="submit"
								label={messages.save}
								primary={true}
								className={style.button}
								disabled={pristine || submitting || isSaving}
							/>
						</div>
					</form>
				</Paper>
				<div style={{ margin: 20, color: 'rgba(0, 0, 0, 0.52)' }}>
					Banner Image
				</div>
				<Paper className="paper-box" zDepth={1}>
					<div className={style.shortBox}>
						<ImageUpload
							uploading={uploadingImage}
							imageUrl={imageUrl}
							onDelete={onImageDelete}
							onUpload={onImageUpload}
						/>
					</div>
				</Paper>
			</React.Fragment>
		);
	} else {
		return null;
	}
};

export default reduxForm({
	form: 'BannerEditForm',
	validate,
	enableReinitialize: true
})(BannerEditForm);
