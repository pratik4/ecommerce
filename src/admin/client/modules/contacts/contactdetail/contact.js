import React from 'react';
import { Field } from 'redux-form';
import style from './style.css';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class ContactDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { contactId, contactView } = this.props;
		console.log('contactId', contactId, contactView);
		return (
			<div>
				<form>
					<Paper className="paper-box" zDepth={1}>
						<div className={style.innerBox}>
							<div className={'row ' + style.attributerow}>
								<div className={'col-xs ' + style.contactAttribute}>
									<strong>Name:</strong> {contactView.name}
								</div>
								<div className={'col-xs ' + style.contactAttribute}>
									<strong>Number : </strong> {contactView.number}
								</div>
							</div>
							<div className={'row ' + style.attributerow}>
								<div className={'col-xs ' + style.contactAttribute}>
									<strong>Email:</strong> {contactView.email}
								</div>
								<div className={'col-xs ' + style.contactAttribute}>
									<strong>city: </strong> {contactView.city}
								</div>
							</div>
							<div className={'row ' + style.attributerow}>
								<div className={'col-xs ' + style.contactAttribute}>
									<strong>Adress:</strong> {contactView.address}
								</div>
								<div className={'col-xs ' + style.contactAttribute}>
									<strong>state: </strong> {contactView.state}
								</div>
							</div>

							<div className={'row ' + style.attributerow}>
								<div className={'col-xs ' + style.contactAttribute}>
									<strong>comments:</strong>
									{contactView.comments}
								</div>
							</div>
						</div>
					</Paper>
				</form>
			</div>
		);
	}
}

export default ContactDetails;
