import React from 'react';

const getAttributeTags = productsAttributes => {
	let attributesArray = [];
	productsAttributes.map((attribute, i) => {
		attribute.values.map((value, index) => {
			value.checked &&
				attributesArray.push({
					name: attribute.name,
					value: value.name
				});
		});
	});

	return attributesArray;
};

class AttributeTag extends React.Component {
	constructor(props) {
		super(props);
	}

	handleDelete = (attribute, e) => {
		e.preventDefault();
		this.props.unsetFilterAttribute(attribute.name, attribute.value);
	};

	render() {
		const { productsAttributes } = this.props;
		const attributes = getAttributeTags(productsAttributes);

		return (
			<React.Fragment>
				{attributes &&
					attributes.map((attribute, i) => (
						<span
							key={i}
							className="tag"
							style={{ backgroundColor: `transparent` }}
						>
							<strong>{attribute.name}</strong> : {attribute.value}
							<button
								style={{ margin: `0px 5px` }}
								onClick={e => {
									this.handleDelete(attribute, e);
								}}
								className="delete is-small"
							/>
						</span>
					))}
			</React.Fragment>
		);
	}
}

const Header = props => {
	const { productsAttributes } = props.state;

	return (
		<AttributeTag
			productsAttributes={productsAttributes}
			unsetFilterAttribute={props.unsetFilterAttribute}
		/>
	);
};

export default Header;
