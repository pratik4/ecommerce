import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import ItemImage from './itemImage';
import ItemPrice from './itemPrice';

const Item = ({
	product,
	addCartItem,
	settings,
	columnCountOnMobile = 2,
	columnCountOnTablet = 2,
	columnCountOnDesktop = 3,
	columnCountOnWidescreen = 3,
	columnCountOnFullhd = 3
}) => {
	const columnCount = 12;

	const columnSizeOnMobile = columnCount / columnCountOnMobile;
	const columnSizeOnTablet = columnCount / columnCountOnTablet;
	const columnSizeOnDesktop = columnCount / columnCountOnDesktop;
	const columnSizeOnWidescreen = columnCount / columnCountOnWidescreen;
	const columnSizeOnFullhd = columnCount / columnCountOnFullhd;

	const imageHeight =
		themeSettings.list_image_max_height &&
		themeSettings.list_image_max_height > 0
			? themeSettings.list_image_max_height
			: 'auto';
	const placeholderHeight =
		themeSettings.list_image_max_height &&
		themeSettings.list_image_max_height > 0
			? themeSettings.list_image_max_height
			: 200;

	return (
		<React.Fragment>
			<div
				className={`column  is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd is-hidden-mobile ${
					product.stock_status
				}`}
			>
				<NavLink to={product.path}>
					<figure className="image" style={{ height: imageHeight }}>
						<ItemImage
							images={product.images}
							productName={product.name}
							height={placeholderHeight}
							mob={false}
						/>
					</figure>
					<div className="content product-caption">
						<div className="product-name">{product.name}</div>
						<div className="product-description">
							Lorem ipsum dolor sit amet, consecteue adipicing elit, sed
						</div>
					</div>
				</NavLink>
			</div>
			<div
				className={`column is-12-mobile is-hidden-tablet ${
					product.stock_status
				}`}
			>
				<NavLink to={product.path}>
					<div className="columns is-mobile">
						<div className="column">
							<figure className="image" style={{ height: imageHeight }}>
								<ItemImage
									images={product.images}
									productName={product.name}
									height={placeholderHeight}
									mob={true}
								/>
							</figure>
						</div>
						<div className="column">
							<div className="content product-caption">
								<div className="product-name">{product.name}</div>
								<div className="product-description">{product.description}</div>
							</div>
						</div>
					</div>
				</NavLink>
			</div>
		</React.Fragment>
	);
};

export default Item;
