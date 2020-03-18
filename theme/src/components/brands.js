import React from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import {
	faChevronRight,
	faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
const SlideItem = styled.div`
    height: 50px;
    background: url('${props => props.src}');
  background-size: cover;
  background-position: center;
`;
*/

/*

const SlideItem = ({ src }) => {
	return (
		<div>
			<figure className="image">
				<img style={{ height: `50px`, width: `50%` }} src={src} />
			</figure>
		</div>
	);
};

export const createImageChildren = brands =>
	brands.map(brand => <SlideItem key={brand.id} src={brand.image} />);

const Wrapper = styled.div``;
class Brands extends React.Component {
	state = {
		activeItemIndex: 0
	};

	render() {
		const { brands } = this.props;
		const noOfChildren = brands.length;
		const children = createImageChildren(brands);

		const componentProps = {
			enablePlaceholder: false,
			numberOfPlaceholderItem: 5,
			numberOfCars: 5,
			gutter: 0,
			slidesToScroll: 2,
			chevronWidth: 24,
			outsideChevron: true,
			showSlither: false,
			firstAndLastGutter: false
		};

		const wrapperStyle = {
			padding: '0 60px',
			margin: '0 auto'
		};

		return (
			<Wrapper>
				<div style={wrapperStyle}>
					<ItemsCarousel
						{...componentProps}
						activeItemIndex={this.state.activeItemIndex}
						requestToChangeActive={value =>
							this.setState({ activeItemIndex: value })
						}
						rightChevron={
							<div>
								<FontAwesomeIcon size="4x" icon={faChevronRight} />
							</div>
						}
						leftChevron={
							<div>
								<FontAwesomeIcon size="4x" icon={faChevronLeft} />
							</div>
						}
						children={children ? children : []}
					/>
				</div>
			</Wrapper>
		);
	}
}

*/

import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext
} from 'pure-react-carousel';

class Brands extends React.Component {
	constructor(props) {
		super(props);
		this.state = { height: 512, width: 1300, vbrands: 8 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener(
			'resize',
			this.updateWindowDimensions.bind(this)
		);
	}

	updateWindowDimensions() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight,
			vbrands: window.innerWidth > 769 ? 8 : 3
		});
	}

	render() {
		const { vbrands } = this.state;
		return (
			<CarouselProvider
				className="brand-CarouselProvider"
				naturalSlideWidth={40}
				naturalSlideHeight={10}
				totalSlides={11}
				visibleSlides={vbrands}
				isPlaying={true}
			>
				<Slider>
					<Slide index={0} className="brand-carousel-slide">
						<img src="/assets/images/Brands/APCLogo.png" />
					</Slide>
					<Slide index={1} className="brand-carousel-slide">
						<img src="/assets/images/Brands/AppleLogo.png" />
					</Slide>
					<Slide index={2} className="brand-carousel-slide">
						<img src="/assets/images/Brands/AsusLogo.png" />
					</Slide>
					<Slide index={3} className="brand-carousel-slide">
						<img
							style={{ height: `inherit` }}
							src="/assets/images/Brands/BicLogo.png"
						/>
					</Slide>
					<Slide index={4} className="brand-carousel-slide">
						<img src="/assets/images/Brands/BrotherLogo.png" />
					</Slide>
					<Slide index={5} className="brand-carousel-slide">
						<img src="/assets/images/Brands/DellLogo.png" />
					</Slide>
					<Slide index={6} className="brand-carousel-slide">
						<img src="/assets/images/Brands/Dlinklogo.png" />
					</Slide>
					<Slide index={7} className="brand-carousel-slide">
						<img src="/assets/images/Brands/Duracell.png" />
					</Slide>
					<Slide index={8} className="brand-carousel-slide">
						<img src="/assets/images/Brands/DellLogo.png" />
					</Slide>
					<Slide index={10} className="brand-carousel-slide">
						<img src="/assets/images/Brands/AppleLogo.png" />
					</Slide>
				</Slider>

				<ButtonBack className="button brands_carousel_button">
					<img className="icon" src="/assets/images/chevron-down.png" />
				</ButtonBack>

				<ButtonNext className="button brands_carousel_button">
					<img className="icon" src="/assets/images/chevron-down_copy.png" />
				</ButtonNext>
			</CarouselProvider>
		);
	}
}
export default Brands;
