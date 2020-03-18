import React from 'react';

import { Accordion, AccordionItem } from 'react-light-accordion';

const DummyContent = () => (
	<p className="about-us-section-4-subtitle">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</p>
);

class Hover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			circle: 3
		};
		this.mouseOver = this.mouseOver.bind(this);
	}

	mouseOver(val) {
		this.setState({
			circle: val
		});
	}

	render() {
		const { circle } = this.state;
		console.log('circle', circle);
		return (
			<React.Fragment>
				<section className="">
					<div className="hero is-medium about-height">
						<div className="hero-body">
							<div className="columns">
								<div className="column is-8">
									<div className="venn-container">
										<div
											onMouseOver={() => this.mouseOver(1)}
											className={`venn venncirctop ${
												circle === 1 ? 'venncirclehover' : 'venncircle'
											}`}
										>
											<div className="venntxttop">
												<img
													className="image"
													src="/assets/images/about/Theroadahead.png"
												/>
											</div>
										</div>
										<div
											onMouseOver={() => this.mouseOver(2)}
											className={`venn venncirclft ${
												circle === 2 ? 'venncirclehover' : 'venncircle'
											} `}
										>
											<div className="venntxtlft">
												<img
													className="image"
													src="/assets/images/about/Mission.png"
												/>
											</div>
										</div>
										<div
											onMouseOver={() => this.mouseOver(3)}
											className={`venn venncircrt ${
												circle === 3 ? 'venncirclehover' : 'venncircle'
											}`}
										>
											<div className="venntxtrt">
												<img
													className="image"
													src="/assets/images/about/vision.png"
												/>
											</div>
										</div>

										<br />
										<br />
										<br />
										<br />
										<br />
										<br />
										<br />
										<br />
										<br />
									</div>
								</div>
								<div className="column">
									<div
										className={`${circle === 1 ? '' : 'about-hide-content'}`}
									>
										<div className="about-us-section-4-title">THE ROAD MAP</div>
									</div>
									<div
										className={`${circle === 2 ? '' : 'about-hide-content'}`}
									>
										<div className="about-us-section-4-title">THE MISSION</div>
									</div>
									<div
										className={`${circle === 3 ? '' : 'about-hide-content'}`}
									>
										<div className="about-us-section-4-title">
											VISION THAT KEEPS US GOING
										</div>
										<div className="about-us-section-4-subtitle">
											Our business revolves around the unique needs or custom
											requirements each one has we envision to provide you with
											exact and premium product solutions and red-carpet
											service.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="is-hidden-desktop">
					<div className="hero">
						<div className="hero-body">
							<div>
								<Accordion atomic={true}>
									<AccordionItem title="THE MISSION">
										<DummyContent />
									</AccordionItem>

									<AccordionItem title="THE ROAD MAP">
										<DummyContent />
									</AccordionItem>

									<AccordionItem title="THE VISION THAT KEEPS US GOING">
										<div className="about-us-section-4-subtitle">
											Our business revolves around the unique needs or custom
											requirements each one has we envision to provide you with
											exact and premium product solutions and red-carpet
											service.
										</div>
									</AccordionItem>
								</Accordion>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Hover;
