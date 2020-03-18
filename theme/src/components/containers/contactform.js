import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Recaptcha from 'react-recaptcha';

const SITE_KEY = '6Ldje7gUAAAAAJDNPGbg4TnIqPBpVkIXPcbfW9Mh';

const Captcha = props => (
	<div>
		<ReCAPTCHA sitekey={SITE_KEY} onChange={props.onChange} />
	</div>
);

const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = 'required';
	}

	if (!values.city) {
		errors.city = 'required';
	}

	if (!values.number) {
		errors.number = 'required';
	} else if (isNaN(Number(values.number))) {
		errors.number = 'Must be a number';
	}

	if (!values.comments) {
		errors.comments = 'required';
	}

	if (!values.email) {
		errors.email = 'required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	return errors;
};

const renderField = ({
	input,
	label,
	className,
	type,
	meta: { touched, error, warning }
}) => (
	<div className="control">
		<label className="contact-us-label">{label}</label>
		<div>
			<input {...input} className={className} type={type} />
			{touched &&
				((error && <span className="contactus-error">{error}</span>) ||
					(warning && <span>{warning}</span>))}
		</div>
	</div>
);

const ContactUsForm = props => {
	let isVerfied = false;

	const { handleSubmit, pristine, reset, submitting, contactUsMain } = props;
	function onChange(value) {
		console.log('Captcha value:', value);
	}

	function onload() {
		console.log('loaded');
	}

	function verifyCallback(response) {
		if (response) {
			isVerfied = true;
		} else {
			isVerfied = false;
		}
	}
	return (
		<div className="section">
			<div className="hero">
				<div className="hero-body">
					<div className="container">
						<div className="contact-form">
							<form
								onSubmit={handleSubmit(val => {
									if (isVerfied) {
										contactUsMain(val);
									}
								})}
							>
								<div className="columns">
									<div className="column is-6">
										<div className="field">
											<Field
												className="input"
												name="name"
												component={renderField}
												type="text"
												label="Name *"
											/>
										</div>
										<div className="field">
											<div className="control">
												<Field
													className="input"
													name="address"
													component={renderField}
													type="text"
													label="Address"
												/>
											</div>
											<div className="field">
												<Field
													className="input"
													name="city"
													component={renderField}
													type="text"
													label="City *"
												/>
											</div>
											<div className="field">
												<Field
													className="input"
													name="state"
													component={renderField}
													type="text"
													label="State"
												/>
											</div>
											<div className="field">
												<Field
													className="input"
													name="number"
													component={renderField}
													type="text"
													label="Contact No *"
												/>
											</div>
										</div>
									</div>
									<div className="column is-6">
										<div className="field">
											<Field
												className="input"
												name="email"
												component={renderField}
												type="email"
												label="Email *"
											/>
										</div>
										<div className="field">
											<Field
												className="textarea"
												name="comments"
												component={renderField}
												type="textarea"
												lable="Comments"
											/>
										</div>
										<div className="field contact-us-recaptcha">
											<div className="control">
												<Recaptcha
													sitekey={SITE_KEY}
													render="explicit"
													verifyCallback={verifyCallback}
													onloadCallback={onload}
												/>
											</div>
										</div>
										<div className="field is-grouped">
											<div className="control">
												<button
													type="submit"
													className="button contact-us-submit"
												>
													SUBMIT
												</button>
											</div>
											<div className="control">
												<button
													type="button"
													disabled={pristine || submitting}
													onClick={reset}
													className="button contact-us-reset"
												>
													RESET
												</button>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default reduxForm({
	form: 'contacusFormFull',
	validate
})(ContactUsForm);
