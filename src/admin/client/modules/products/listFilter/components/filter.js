import React from 'react';
import messages from 'lib/text';
import style from './style.css';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

const Filter = ({
	filter,
	setEnabled,
	setDiscontinued,
	setOnSale,
	setStock,
	setFeatured
}) => {
	const { enabled, discontinued, onSale, stockStatus, featured } = filter;

	return (
		<div className={style.filter}>
			<SelectField
				value={enabled}
				onChange={(event, index, value) => {
					setEnabled(value);
				}}
				floatingLabelText={messages.enabled}
				fullWidth={true}
			>
				<MenuItem value={null} primaryText={messages.all} label=" " />
				<MenuItem value={false} primaryText={messages.no} />
				<MenuItem value={true} primaryText={messages.yes} />
			</SelectField>

			<SelectField
				value={featured}
				onChange={(event, index, value) => {
					setFeatured(value);
				}}
				floatingLabelText="Featured"
				fullWidth={true}
			>
				<MenuItem value={null} primaryText={messages.all} label=" " />
				<MenuItem value={false} primaryText={messages.no} />
				<MenuItem value={true} primaryText={messages.yes} />
			</SelectField>

			<SelectField
				value={discontinued}
				onChange={(event, index, value) => {
					setDiscontinued(value);
				}}
				floatingLabelText={messages.products_discontinued}
				fullWidth={true}
			>
				<MenuItem value={null} primaryText={messages.all} label=" " />
				<MenuItem value={false} primaryText={messages.no} />
				<MenuItem value={true} primaryText={messages.yes} />
			</SelectField>
		</div>
	);
};

export default Filter;
