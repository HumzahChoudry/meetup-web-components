import React from 'react';
import NumberInput from './NumberInput';
import { storiesOf } from '@storybook/react';
import { decorateWithLocale } from '../utils/decorators';
import {
	IntlProvider,
	FormattedMessage,
	defineMessages,
} from 'react-intl';


storiesOf('NumberInput', module)
	.addDecorator(decorateWithLocale)
	.add('default', () => (<div>
		<NumberInput
			label='How many?'
			id='amount'
			name='amount' />
	</div>))
	.add('with value', () => (<div>
		<NumberInput
			label='Are you bringing any guests?'
			id='guestCount'
			name='guests'
			value='0' />
	</div>))
	.add('with min and max', () => (<div>
		<NumberInput
			label='How many? min 2, max 10'
			id='guestCount'
			name='guests'
			min='2'
			max='10' />
	</div>))
	.add('with error', () => (<div>
		<NumberInput
			label='How many?'
			id='amount'
			name='amount'
			error='Not so fast. You have an error.' />
	</div>))
	.add('error state formatted', () => {
		const trn = defineMessages({
			error: {
				defaultMessage: 'This error is a formatted message.',
				id: 'storybook.anError',
				description: { jira: 'SDS-204' },
			}
		});
		return (
			<IntlProvider defaultLocale='en-US' locale='en-US'>
				<NumberInput
					label='How many?'
					id='amount'
					name='amount'
					error={<FormattedMessage {...trn.error} />} />
			</IntlProvider>
		);
	})
	.add('required', () =>
		(<NumberInput
			label='How many?'
			id='amount'
			name='amount'
			required />)
	);

