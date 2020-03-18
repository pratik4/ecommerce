import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

export default class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			hasFocus: false,
			category: 'all-categories'
		};
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	handleKeyPress = e => {
		if (e.keyCode === 13 || e.which === 13) {
			this.handleSearch();
		}
	};

	handleKeyDown = e => {
		if (e.keyCode === 27) {
			this.handleClear();
		}
	};

	handleSearch = () => {
		this.props.onSearch(this.state.value, this.state.category);
	};

	handleClear = () => {
		this.setState({ value: '' });
		this.props.onSearch('');
	};

	handleFocus = () => {
		this.setState({ hasFocus: true });
	};

	handleBlur = () => {
		this.setState({ hasFocus: false });
	};

	render() {
		const { hasFocus } = this.state;
		const placeholderText =
			themeSettings.search_placeholder &&
			themeSettings.search_placeholder.length > 0
				? themeSettings.search_placeholder
				: text.searchPlaceholder;

		return (
			<React.Fragment>
				<div
					className={
						'search-box ' +
						this.props.className +
						(hasFocus ? ' has-focus' : '')
					}
				>
					<input
						className="search-input"
						type="text"
						placeholder={placeholderText}
						value={this.state.value}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
						onKeyDown={this.handleKeyDown}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
					/>

					{this.state.value &&
						this.state.value !== '' && (
							<img
								className="search-icon-clear"
								src="/assets/images/close.svg"
								onClick={this.handleClear}
							/>
						)}

					<span className="select">
						<select
							className="search-select"
							onChange={e => {
								this.setState({
									category: e.target.value
								});
							}}
						>
							<option value="all-categories">All Categories</option>

							{this.props.categories
								.filter(category => category.parent_id === null)
								.map((category, index) => (
									<option key={index} value={category.slug}>
										{category.name}
									</option>
								))}
						</select>
					</span>

					<span className="button search-button" onClick={this.handleSearch}>
						FIND ITEMS
					</span>
				</div>
			</React.Fragment>
		);
	}
}
