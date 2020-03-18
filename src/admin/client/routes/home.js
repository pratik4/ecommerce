import React from 'react';
import { defaults } from 'react-chartjs-2';

// Set charts default
defaults.global.responsive = true;
defaults.global.maintainAspectRatio = false;
defaults.global.title.display = false;
defaults.global.legend.position = 'bottom';
defaults.global.legend.labels.boxWidth = 20;
defaults.global.tooltips.mode = 'index';
defaults.global.tooltips.intersect = false;
defaults.global.tooltips.bodySpacing = 8;
defaults.global.tooltips.titleMarginBottom = 16;

import { Card, CardTitle } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import style from './styles.css';
const styles = {
	card: {
		width: 280,
		marginBotton: 15,
		marginRight: 15
	},
	textContainer: {
		paddingBottom: 0
	},
	title: {
		color: '#212121',
		fontSize: '15px',
		lineHeight: '18px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	link: {
		textDecoration: 'none'
	}
};

export default () => {
	return (
		<div
			className="row row--no-gutter sroll col-full-height"
			style={{ padding: 20, alignContent: 'flex-start' }}
		>
			<Link to="/admin/products" style={styles.link}>
				<Card
					style={styles.card}
					containerStyle={styles.textContainer}
					className={style.card}
				>
					<CardTitle title="Products" />
				</Card>
			</Link>
			<Link to="/admin/products/categories" style={styles.link}>
				<Card
					style={styles.card}
					containerStyle={styles.textContainer}
					className={style.card}
				>
					<CardTitle title="Categories" />
				</Card>
			</Link>
			<Link to="/admin/enquiries" style={styles.link}>
				<Card
					style={styles.card}
					containerStyle={styles.textContainer}
					className={style.card}
				>
					<CardTitle title="Enquiries" />
				</Card>
			</Link>
			<Link to="/admin/contactus" style={styles.link}>
				<Card
					style={styles.card}
					containerStyle={styles.textContainer}
					className={style.card}
				>
					<CardTitle title="Contact Us" />
				</Card>
			</Link>
		</div>
	);
};
