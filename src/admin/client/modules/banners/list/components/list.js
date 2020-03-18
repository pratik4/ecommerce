import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
const styles = {
	selectedIdItem: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)'
	},
	innerItem: {
		paddingLeft: 55
	}
};

const VisibilityIcon = (
	<FontIcon className="material-icons">visibility</FontIcon>
);
const DraftIcon = (
	<FontIcon className="material-icons">visibility_off</FontIcon>
);

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
		const icon = item.enabled ? VisibilityIcon : DraftIcon;
		const style = item.id === selectedId ? styles.selectedItem : null;

		return (
			<ListItem
				primaryText={item.name}
				initiallyOpen={opened}
				onClick={this.handleClick}
				leftIcon={icon}
				style={style}
			/>
		);
	}
}
class banners extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { selectedId, items, opened } = this.props;
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

export default banners;
