import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { withMatchMedia } from './withMatchMedia';

import Stripe from '../../layout/Stripe';
import Bounds from '../../layout/Bounds';
import Section from '../../layout/Section';

import { MEDIA_QUERIES } from '../designConstants';

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		const {
			isAtSmallUp,
			isAtMediumUp,
			isAtLargeUp,
			isAtHugeUp,
		} = this.props;

		const stripeStyle = {
			height: '100%'
		};

		return (
			<Stripe inverted style={stripeStyle}>
				<Bounds className='padding--left padding--right'>
					<Section className='runningText'>
						<h1 className='text--display1'>Viewport-aware props</h1>
						<p>
							By wrapping <code>TestComponent</code> with <code className='text--red'>withMatchMedia</code>,
							we can use the breakpoint props it provides to conditionally render elements based on viewport size.
						</p>
						<p className='text--bold'>Resize your browser to see it in action.</p>
					</Section>
					<Section className='runningText border--none'>
						<h1 className='text--display3 text--secondary'><code>True</code> props:</h1>
						<ul className='text--big text--mono'>
							{isAtSmallUp && <li className='text--teal'>isAtSmallUp</li>}
							{isAtMediumUp && <li className='text--yellow'>isAtMediumUp</li>}
							{isAtLargeUp && <li className='text--pink'>isAtLargeUp</li>}
							{isAtHugeUp && <li className='text--red'>isAtHugeUp</li>}
						</ul>
					</Section>
				</Bounds>
			</Stripe>
		);
	}
}
const TestComponentWithMatchMedia = withMatchMedia(
	TestComponent,
	Object.keys(MEDIA_QUERIES) // ['small', 'medium', 'large', 'huge']
);

storiesOf('withMatchMedia', module)
	.add('Test component using provided media props', () =>
		<TestComponentWithMatchMedia />
	);
