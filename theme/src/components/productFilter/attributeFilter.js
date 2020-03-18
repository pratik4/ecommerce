import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

class AttributeValue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.checked !== this.props.checked) {
			this.setState({ checked: nextProps.checked });
		}
	}

	onChange = event => {
		const {
			attributeName,
			valueName,
			setFilterAttribute,
			unsetFilterAttribute
		} = this.props;
		const checked = event.target.checked;

		this.setState({ checked: checked });

		if (checked) {
			setFilterAttribute(attributeName, valueName);
		} else {
			unsetFilterAttribute(attributeName, valueName);
		}
	};

	render() {
		const { valueName, count } = this.props;
		const isDisabled = count === 0;
		const classChecked = this.state.checked ? 'attribute-checked' : '';
		const classDisabled = isDisabled ? 'attribute-disabled' : '';

		return (
			<label
				style={{ margin: `10px 0px` }}
				className={classChecked + ' ' + classDisabled}
			>
				<input
					type="checkbox"
					disabled={isDisabled}
					onChange={this.onChange}
					checked={this.state.checked}
				/>
				{valueName}
			</label>
		);
	}
}

class AttributeSet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			atributeIsOpen: false
		};
	}

	dropdownClick = () => {
		this.setState({
			atributeIsOpen: !this.state.atributeIsOpen
		});
	};

	render() {
		const { attribute, setFilterAttribute, unsetFilterAttribute } = this.props;
		const { atributeIsOpen } = this.state;

		const values = attribute.values.map((value, index) => (
			<AttributeValue
				key={index}
				attributeName={attribute.name}
				valueName={value.name}
				checked={value.checked}
				count={value.count}
				setFilterAttribute={setFilterAttribute}
				unsetFilterAttribute={unsetFilterAttribute}
			/>
		));
		const dropdownactive = atributeIsOpen ? 'dropdown-active' : ' ';
		return (
			<React.Fragment>
				<div className="attribute">
					<div className="level is-mobile">
						<div className="level-left">
							<span className="attribute-title">{attribute.name}</span>
						</div>
						<div className="level-right">
							<span>
								<img
									onClick={this.dropdownClick}
									className="icon"
									src="/assets/images/arrow_down.svg"
									alt="v"
								/>
							</span>
						</div>
					</div>
					<div className={dropdownactive}>{values}</div>
				</div>
				<hr className="productpage-top-line" />
			</React.Fragment>
		);
	}
}

const AttributeFilter = ({
	attributes,
	setFilterAttribute,
	unsetFilterAttribute
}) => {
	const attributeSets = attributes.map((attribute, index) => (
		<AttributeSet
			key={index}
			attribute={attribute}
			setFilterAttribute={setFilterAttribute}
			unsetFilterAttribute={unsetFilterAttribute}
		/>
	));

	return <div className="attribute-filter">{attributeSets}</div>;
};

export default AttributeFilter;
