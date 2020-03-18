import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';
import { List, ListItem } from 'material-ui/List';

const styles = {
	selectedIdItem: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)'
	},
	innerItem: {
		paddingLeft: 55
	}
};

class Item extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick = () => {
		const { item } = this.props;
		this.props.onSelect(item.id);
	};

	render() {
		const { item, opened, selectedId, onSelect } = this.props;

		return (
			<ListItem
				primaryText={item.name}
				initiallyOpen={opened}
				onClick={this.handleClick}
			/>
		);
	}
}
class brands extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { selectedId, items, opened = false } = this.props;

		return (
			<List>
				{items.map(item => (
					<Item
						key={item.id}
						item={item}
						opened={opened}
						selectedId={selectedId}
						onSelect={this.props.onSelect}
					/>
				))}
			</List>
		);
	}
}

export default brands;
