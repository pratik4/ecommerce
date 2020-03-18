import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import api from 'lib/api';
import Head from './head';

const ContactItem = ({ contact, onSelect, selected }) => {
	const { form } = contact;
	return (
		<div>
			<div
				style={{ padding: `10px 0px` }}
				className="row row--no-gutter middle-xs"
			>
				<div className="col-xs-8 col--no-gutter">
					<div className="row row--no-gutter">
						<div className="col-xs-1 col--no-gutter">
							<input
								type="checkbox"
								onChange={onSelect}
								checked={selected}
								value={contact._id}
							/>
						</div>
						<div className="col-xs-5">{contact.name}</div>
						<div className="col-xs-6 ">{contact.number}</div>
					</div>
				</div>
				<div className="col-xs-3 col--no-gutter">{contact.city}</div>
				<Link
					to={`/admin/contactus/${contact._id}`}
					className="col-xs-1 col--no-guuter"
				>
					<FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
				</Link>
			</div>
			<Divider />
		</div>
	);
};

export default class ContactsList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { contacts, selected, onSelect, onSelectAll } = this.props;
		console.log('contact', contacts);
		let listItem = contacts.map((contact, index) => {
			const contactSelected = selected.includes(contact._id);
			return (
				<ContactItem
					key={index}
					contact={contact}
					selected={contactSelected}
					onSelect={onSelect}
				/>
			);
		});

		return (
			<Paper className="paper-box" zDepth={1}>
				<Head onSelectAll={onSelectAll} />
				<Divider />
				<div style={{ width: '100%' }}>
					<List style={{ padding: 0 }}>{listItem}</List>
				</div>
			</Paper>
		);
	}
}
