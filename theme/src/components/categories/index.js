import React from 'react';
import LazyLoad from 'react-lazyload';
import * as helper from '../../lib/helper';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import QRCode from 'qrcode.react';

/*
const ItemImage = ({ image, categoryName, height }) => {
	if (image && image.length > 0) {
		const imageUrl = helper.getThumbnailUrl(
			image,
			themeSettings.listThumbnailWidth
		);
		const alt = categoryName;
		console.log('imageUrl', imageUrl);
		return (
			<LazyLoad height="200px">
				<img src={imageUrl} alt={alt} title={alt} />
			</LazyLoad>
		);
	}
	return null;
};

const Item = ({ category }) => {
	return (
		<div style={{ margin: `30px 0px` }} className="column is-6-widescreen">
			<NavLink to={category.path} style={{ height: `256px` }}>
				<figure className="image is-256x256" style={{ width: `256px` }}>
					<ItemImage image={category.image} categoryName={category.name} />
				</figure>
			</NavLink>
		</div>
	);
};

const Categories = ({ categories }) => {
	const items = categories
		? categories
				.filter(category => category.parent_id === null)
				.map(category => <Item key={category.id} category={category} />)
		: null;

	return (
		<React.Fragment>
			<div
				style={{ margin: `100px 0px` }}
				className="columns is-centered is-multiline is-mobile products"
			>
				{items}
			</div>
		</React.Fragment>
	);
};

export default Categories;

*/

class Categories extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div className="section">
					<div className="hero">
						<div className="hero-body">
							<div className="columns">
								<div className="column is-8">
									<figure className="image" style={{ position: `relative` }}>
										<img src="/assets/images/Categories/ITproducts.jpg" />
										<div className="home_category_title_1">
											<h1>IT Products</h1>
											<a href="/category-b" className="home_category_link">
												<u>SEE MORE</u>
											</a>
										</div>
									</figure>
								</div>
								<div className="column is-4">
									<figure className="image" style={{ position: `relative` }}>
										<img src="/assets/images/Categories/StationeryProducts.jpg" />
										<div className="home_category_title_2">
											<h1>Stationary Products</h1>
											<NavLink
												to="/category-c"
												className="home_category_link-2"
											>
												<u>SEE MORE</u>
											</NavLink>
										</div>
									</figure>
								</div>
							</div>
							<div className="columns">
								<div className="column is-6">
									<figure className="image" style={{ position: `relative` }}>
										<img src="/assets/images/Categories/FurnitureProducts.jpg" />
										<div className="category_3">
											<div className="home_category_title_3">
												<h1>Furniture Products</h1>
												<NavLink
													to="/category-a"
													className="home_category_link-3"
												>
													<u>SEE MORE</u>
												</NavLink>
											</div>
											<div className="category_3_qrcode is-hidden-touch">
												<QRCode
													value="www.google.com"
													includeMargin={true}
													size={64}
												/>
												<div className="category_3_qrcode_text">Furniture</div>
											</div>
										</div>
									</figure>
								</div>
								<div className="column is-6">
									<figure className="image" style={{ position: `relative` }}>
										<img src="/assets/images/Categories/OtherOfficeProducts.jpg" />
										<div className="home_category_title_4">
											<h1>Other Office Products</h1>
											<NavLink
												to="/category-4"
												className="home_category_link-4"
											>
												<u>SEE MORE</u>
											</NavLink>
										</div>
									</figure>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Categories;
