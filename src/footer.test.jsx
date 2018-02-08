import React from 'react';
import { shallow, mount } from 'enzyme';

import {
	Footer,
	FooterCategory,
	LanguageSelectInput,
	SocialIconsList,
	languagesAsOptions
} from './Footer';

const APP_BADGES_CLASSNAME = 'appBadges';
const DEFAULT_LANG = 'en-US';
const FRENCH_LANG = 'fr-FR';
const onLanguageSelect = jest.fn();

const footerLinkSets = [
	{
		header: 'Your Account',
		items: [
			<a href='/register'>Settings</a>,
			<a href="/logout">Log out</a>,
			<a href="/help">Help</a>
		]
	},
	{
		header: 'Discover',
		items: [
			<a href='/groups'>Groups</a>,
			<a href="/calendar">Calendar</a>,
			<a href="/topics">Topics</a>,
			<a href="/cities">Cities</a>
		]
	},
	{
		header: 'Meetup',
		items: [
			<a href='/about'>About</a>,
			<a href="/pro">Meetup Pro</a>,
			<a href="/jobs">Careers</a>,
			<a href="/apps">Apps</a>,
			<a href="/meetup_api">API</a>
		]
	},
];

const subFooterLinks = [
	<a href="/terms">Terms</a>,
	<a href="/privacy">Privacy</a>,
	<a href="/cookie_policy">Cookies</a>,
];

const MOCK_DEFAULT_STATE = {
	localeCode: 'en-US',
	linkSets: footerLinkSets,
	onLanguageSelect: onLanguageSelect,
	subFooterLinks: subFooterLinks,
	appBadges: <div className={APP_BADGES_CLASSNAME} />,
	createMeetup: {
		text: 'Create a Meetup',
		link: '/create/'
	},
	media: { isAtLargeUp: false },
};

const MOCK_AUTHENTICATED_STATE = { isLoggedIn: true };

describe('Footer', () => {
	const footerComponent = shallow(<Footer {...MOCK_DEFAULT_STATE} />);
	it('exists', () => {
		expect(footerComponent).toMatchSnapshot();
	});
	it('should render social media icon list', () => {
		const socialMediaIconList = footerComponent.find(SocialIconsList);
		expect(socialMediaIconList.exists()).toBe(true);
	});
	it('should render FooterCategory with linkSet', () => {
		const footerCategories = shallow(<FooterCategory {...footerLinkSets[0]} />);
		expect(footerCategories).toMatchSnapshot();
	});
});

describe('Footer unauthenticated user', () => {
	const footerComponent = shallow(<Footer {...MOCK_DEFAULT_STATE} />);
	it('shows language picker', () => {
		const langSelect = footerComponent.find(LanguageSelectInput);

		expect(langSelect.length).toBeGreaterThan(0);
	});
});

describe('Footer authenticated user', () => {
	const footerComponent = shallow(
		<Footer isLoggedIn {...MOCK_DEFAULT_STATE} {...MOCK_AUTHENTICATED_STATE} />
	);
	it('does *not* show language picker', () => {
		const langSelect = footerComponent.find(LanguageSelectInput);
		expect(langSelect.length).toBe(0);
	});
});

describe('LanguageSelectInput', () => {
	it('exists', () => {
		const langSelectInput = shallow(<LanguageSelectInput language={DEFAULT_LANG} />);
		expect(langSelectInput).toMatchSnapshot();
	});
	it('should render the correct language options', () => {
		const langSelectInput = shallow(<LanguageSelectInput language={DEFAULT_LANG} />);
		expect(langSelectInput.prop('options')).toEqual(languagesAsOptions);
	});
	it('should render the correct language value', () => {
		const langSelectInput = mount(<LanguageSelectInput language={DEFAULT_LANG} />);
		const selectWrapper = langSelectInput.find('select');
		expect(selectWrapper.prop('value')).toEqual(DEFAULT_LANG);
	});
	it('should call onLanguageSelect', () => {
		const footerWrapper = mount(<Footer {...MOCK_DEFAULT_STATE} />);
		const selectWrapper = footerWrapper.find(LanguageSelectInput).find('select');
		expect(onLanguageSelect).not.toHaveBeenCalled();
		selectWrapper.simulate('change');
		expect(onLanguageSelect).toHaveBeenCalled();
	});
});

describe('SocialIconsList', () => {
	it('exists', () => {
		const socialIconList = shallow(<SocialIconsList language={FRENCH_LANG} />);
		expect(socialIconList).toMatchSnapshot();
	});
});

