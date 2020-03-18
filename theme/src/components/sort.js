import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';

const Sort = ({ defaultSort, currentSort, setSort }) => (
	<div className="columns is-mobile sort">
		<div className="column is-4 sort-title">{text.sort}:</div>
		<div className="column">
			<span className="select is-fullwidth">
				<select
					onChange={e => {
						setSort(e.target.value);
					}}
					value={currentSort}
				>
					<option value={defaultSort}>{text.sortFavorite}</option>
					<option value={themeSettings.sortNewest}>{text.sortNewest}</option>
				</select>
			</span>
		</div>
	</div>
);

Sort.propTypes = {
	defaultSort: PropTypes.string.isRequired,
	currentSort: PropTypes.string.isRequired,
	setSort: PropTypes.func.isRequired
};

export default Sort;

/*
<div className={`dropdown ${dropdown ? 'is-active' : ''}`}>
	<div className="dropdown-trigger">
		<button
			className="button catalogue-button"
			aria-haspopup="true"
			aria-controls="dropdown-menu"
			onClick={this.ondropdown}
		>
			<span> Dropdown button</span>
			<span className="icon is-small">
				<i aria-hidden="true">v</i>
			</span>
		</button>
	</div>
	<div className="dropdown-menu" id="dropdown-menu" role="menu">
		<div className="dropdown-content">
			<a href="" className="dropdown-item">
				Dropdown-item
			</a>
			<a className="dropdown-item">other dropdown item</a>
		</div>
	</div>
</div>
*/
