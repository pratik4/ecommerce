import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { themeSettings } from '../lib/settings';
import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext
} from 'pure-react-carousel';

/*
const bannerContent = {
	position:'absolute',
	top:'10px',
	color:'black',
}

const renderItem = item => (
	<div className="image-gallery-image">
		<NavLink to={item.path || ''}>
			<img src={item.original} alt={item.title} />
			<div style={bannerContent}>
				<div className="">{item.title}</div>
				<div className="">{item.description}</div>
			</div>
		</NavLink>
	</div>
);

const HomeSlider = ({ banners }) => {
	if (banners && banners.length > 0) {
		const items = banners.map(item => ({
			original: item.image,
			title: item.title || '',
			description: item.description || '',
			path: item.path || '',
			button: item.button || ''
		}));
		return (
			<section>
				<div className="home-slider">
					<ImageGallery
						items={items}
						lazyLoad
						showThumbnails={false}
						slideInterval={2000}
						showNav={themeSettings.home_gallery_shownav === true}
						showBullets={banners.length > 1}
						showPlayButton={false}
						showFullscreenButton={false}
						slideOnThumbnailHover={false}
						renderItem={renderItem}
					/>
				</div>
			</section>
		);
	}
	return null;
};

HomeSlider.propTypes = {
	banners: PropTypes.arrayOf(PropTypes.shape({}))
};

HomeSlider.defaultProps = {
	banners: null
};
*/

/*
class HomeSlider extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
			<div>
				<Slider {...settings}>
					<div className="slider">
						<img src="/assets/images/Banners/Banner01.jpg" />
						<div className="carousel-1">
							<div className="title">
								Genuine Products Premium Brands. 100% Quality Assurance.
							</div>
							<div className="subtitle">
								The biggest Office Supplies store in Abuja, Nigeria.
							</div>
							<div className="link">
								<a href="/">
									<u>VISIT US</u>
								</a>
							</div>
						</div>
					</div>
					<div>
						<img src="/assets/images/Banners/Banner02.jpg" />
					</div>
					<div>
						<img src="/assets/images/Banners/Banner03.jpg" />
					</div>
				</Slider>
			</div>
		);
	}
}
*/

import ReactSwipe from 'react-swipe';

class HomeSlider extends React.Component {
	render() {
		let reactSwipeEl;
		return (
			<div>
				<ReactSwipe
					className="carousel"
					swipeOptions={{ auto: 3000, continuous: true }}
					ref={el => (reactSwipeEl = el)}
				>
					<div className="slider-banner">
						<img src="/assets/images/Banners/Banner01.jpg" />
						<div className="carousel-1">
							<div className="title">
								Genuine Products Premium Brands. 100% Quality Assurance.
							</div>
							<div className="subtitle">
								The biggest Office Supplies store in Abuja, Nigeria.
							</div>
							<div className="link">
								<a href="/">
									<u>VISIT US</u>
								</a>
							</div>
						</div>
						<span className="banner-button">
							<span
								className="banner-button-text"
								onClick={() => reactSwipeEl.prev()}
							>
								<span>PREV</span>
							</span>
							<span style={{ margin: `0px 10px` }}>|</span>
							<span
								className=" banner-button-text"
								onClick={() => reactSwipeEl.next()}
							>
								<span>NEXT</span>
							</span>
						</span>
					</div>
					<div className="slider-banner">
						<img src="/assets/images/Banners/Banner02.jpg" />
						<span className="banner-button">
							<span
								className="banner-button-text"
								onClick={() => reactSwipeEl.prev()}
							>
								<span>PREV</span>
							</span>
							<span style={{ margin: `0px 10px` }}>|</span>
							<span
								className=" banner-button-text"
								onClick={() => reactSwipeEl.next()}
							>
								<span>NEXT</span>
							</span>
						</span>
					</div>
					<div className="slider-banner">
						<img src="/assets/images/Banners/Banner03.jpg" />
						<span className="banner-button">
							<span
								className="banner-button-text"
								onClick={() => reactSwipeEl.prev()}
							>
								<span>PREV</span>
							</span>
							<span style={{ margin: `0px 10px` }}>|</span>
							<span
								className=" banner-button-text"
								onClick={() => reactSwipeEl.next()}
							>
								<span>NEXT</span>
							</span>
						</span>
					</div>
				</ReactSwipe>
			</div>
		);
	}
}
export default HomeSlider;
