import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Head from './head';

const EnquiryItem = ({ enquiry, onSelect, selected }) => {
	const { form, name, url } = enquiry;
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
								value={enquiry._id}
							/>
						</div>
						<div className="col-xs-5">{form.name}</div>
						<div className="col-xs-6">{form.email}</div>
					</div>
				</div>
				<div className="col-xs-4 col--no-gutter">
					<a style={{ textDecoration: none }} target="_blank" href={url}>
						{name}
					</a>
				</div>
			</div>
			<Divider />
		</div>
	);
};

export default class EnquiryList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { enquiries, selected, onSelect, onSelectAll } = this.props;
		let listItems = enquiries.map((enquiry, index) => {
			const enquirySelected = selected.includes(enquiry._id);
			return (
				<EnquiryItem
					key={index}
					enquiry={enquiry}
					selected={enquirySelected}
					onSelect={onSelect}
				/>
			);
		});

		return (
			<Paper className="paper-box" zDepth={1}>
				<Head onSelectAll={onSelectAll} />
				<Divider />
				<div style={{ width: '100%' }}>
					<List style={{ padding: 0 }}>{listItems}</List>
				</div>
			</Paper>
		);
	}
}
