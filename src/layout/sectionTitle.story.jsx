import React from 'react';
import Bounds from './Bounds';
import Section from './Section';
import SectionTitle from './SectionTitle';
import { withKnobs, text } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';

storiesOf('Layout/SectionTitle', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.add(
		'Default',
		() => (
			<div style={{ height: '100vh', width: '100%' }}>
				<Bounds>
					<Section>
						<SectionTitle
							title={text('title', 'Section One')}
							className={text('className', '')}
						/>
						<div className="runningText">
							<p>
								Section content goes here. Lorem Ipsum is simply dummy
								text of the printing and typesetting industry. Lorem Ipsum
								has been the industry's standard dummy text ever since the
								1500s, when an unknown printer took a galley of type and
								scrambled it to make a type specimen book.
							</p>
						</div>
					</Section>
					<Section>
						<SectionTitle
							title={text('title', 'Section Two')}
							className={text('className', '')}
						/>
						<div className="runningText">
							<p>
								More section content goes here. It is a long established
								fact that a reader will be distracted by the readable
								content of a page when looking at its layout. The point of
								using Lorem Ipsum is that it has a more-or-less normal
								distribution of letters, as opposed to using 'Content
								here, content here', making it look like readable English.
							</p>
						</div>
					</Section>
				</Bounds>
			</div>
		),
		{ info: { text: 'Basic section title without action on the right' } }
	)
	.add(
		'With action link',
		() => (
			<div style={{ height: '100vh', width: '100%' }}>
				<Bounds>
					<Section>
						<SectionTitle
							title={text('title', 'Section One')}
							className={text('className', '')}
							action={
								<a href="#see-all" className="link">
									See all
								</a>
							}
						/>
						<ul className="gridList gridList--has2 atMedium_gridList--has4">
							<li className="gridList-item">
								<div>
									<div className="card card--group pseudoLine inverted">
										<div className="card--group-content">
											<h4 className="card--group-content-name">
												The NYC Small Dog Social Group
											</h4>
										</div>
									</div>
								</div>
							</li>
							<li className="gridList-item">
								<div>
									<div className="card card--group pseudoLine inverted">
										<div className="card--group-content">
											<h4 className="card--group-content-name">
												Awesome Things to Do
											</h4>
										</div>
									</div>
								</div>
							</li>
							<li className="gridList-item">
								<div>
									<div className="card card--group pseudoLine inverted">
										<div className="card--group-content">
											<h4 className="card--group-content-name">
												Brooklyn Wildlife: Art, Parties and Music
											</h4>
										</div>
									</div>
								</div>
							</li>
							<li className="gridList-item">
								<div>
									<div className="card card--group pseudoLine inverted">
										<div className="card--group-content">
											<h4 className="card--group-content-name">
												Brooklyn Society for Ethical Culture
											</h4>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</Section>
				</Bounds>
			</div>
		),
		{ info: { text: 'Section title with action on the right' } }
	);
