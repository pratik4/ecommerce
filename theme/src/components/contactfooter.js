import React from 'react';

import { Field, reduxForm } from 'redux-form';

const validate = values => {
	const errors = {};
	if (!values.name) {
		errrors.name = 'required';
	}

	if (!values.comments) {
		errors.comments = 'required';
	}
};

const renderField = ({
	input,
	placeholder,
	className,
	type,
	meta: { touched, error, warning }
}) => (
	<div className="control">
		<div>
			<input
				{...input}
				className={className}
				type={type}
				placeholder={placeholder}
			/>
			{touched &&
				((error && <span className="contactus-error">{error}</span>) ||
					(warning && <span>{warning}</span>))}
		</div>
	</div>
);

const FooterContact = props => {
	const { handleSubmit, pristine, reset, submitting, contactUsMain } = props;

	return (
		<div className="column is-3">
			<div className="contact-us">Contact Us</div>
			<form
				onSubmit={handleSubmit(val => {
					contactUsMain(val);
				})}
			>
				<div className="field">
					<Field
						className="input footer-input"
						name="name"
						component="input"
						type="text"
						placeholder="Text input"
					/>
				</div>
				<div className="field">
					<Field
						className="textarea footer-input"
						name="comments"
						component="textarea"
						type="textarea"
					/>
				</div>
				<button type="submit" className="button">
					SEND
				</button>
			</form>
		</div>
	);
};

export default reduxForm({
	form: 'footerform'
})(FooterContact);
