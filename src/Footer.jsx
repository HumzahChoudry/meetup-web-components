import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import locales from 'mwp-config/locales';

import { languageMap } from './utils/languageMap';

import Bounds from './layout/Bounds';
import Chunk from './layout/Chunk';
import Flex from './layout/Flex';
import FlexItem from './layout/FlexItem';
import InlineBlockList from './layout/InlineBlockList';
import GridList from './layout/GridList';
import Icon from './media/Icon';
import Section from './layout/Section';
import SelectInput from './forms/SelectInput';
import Stripe from './layout/Stripe';
import withMatchMedia from './utils/components/withMatchMedia';

import { getSocialLinks } from './utils/getSocialLinks';

export const FooterCategory = (props) => (
	<Chunk>
		<h4 className="text--bold margin--bottom">{props.header}</h4>
		<GridList
			columns={{
				default: 2,
				medium: 1,
			}}
			className="text--secondary text--small"
			itemClassNames="footer-item"
			items={props.items}
		/>
	</Chunk>
);


export const SocialIconsList = (language) => {
	const socialLinks = getSocialLinks(language);
	const socialIcons = [
		<a href={socialLinks.facebook}>
			<Icon shape="external-facebookboxed" size="s" />
		</a>,
		<a href={socialLinks.twitter}>
			<Icon className="margin--left" shape="external-twitter" size="s" />
		</a>,
		<a href={socialLinks.youtube}>
			<Icon className="margin--left" shape="external-youtube" size="s" />
		</a>,
		<a href={socialLinks.instagram}>
			<Icon className="margin--left" shape="external-instagram" size="s" />
		</a>,
		<a href={socialLinks.medium}>
			<Icon className="margin--left" shape="external-medium" size="s" />
		</a>,
	];

	return <InlineBlockList items={socialIcons} />;
};

export const LanguageSelectInput = (props) => (
	<SelectInput
		onChange={props.onChange}
		options={locales.map(language => ({
			label: languageMap[language],
			value: language,
		}))}
		name="languagePicker"
		value={props.currentLocaleCode}
		label="Language"
		labelClassName="visibility--a11yHide"
	/>
);

export const Footer = ({
	appBadges,
	className,
	createMeetup,
	isLight,
	isLoggedIn,
	localeCode,
	linkSets,
	media,
	onLanguageSelect,
	subFooterLinks,
	...other
}) => {
	const classNames = cx('column-item', 'column-item--shrink', className);

	return (
		<footer
			id="mupFooter"
			className={classNames}
			{...other}
		>
			<Stripe
				inverted={!isLight}
				className={cx('footerStripe-main', {
					'footerStripe-main--isLight': isLight,
				})}
			>
				<Bounds narrow className="bounds--footer">
					<Section hasSeparator>
						<Chunk>
							<a
								href={createMeetup.link}
								className="link link--white"
							>
								{createMeetup.text}
							</a>
						</Chunk>
					</Section>
					<Section hasSeparator className="border--none">
						<Flex direction="column" switchDirection="large">
							<FlexItem className="margin--bottom">
								<Flex direction="column" switchDirection="medium">
									{
										linkSets.map((linkSet, i) => (
											<FlexItem key={`linkSet-${i}`}>
												<FooterCategory {...linkSet} />
											</FlexItem>
										))
									}
								</Flex>
							</FlexItem>
							<FlexItem shrink>
								<Flex noGutters direction="column">
									<FlexItem shrink>
										<Chunk className="align--center atMedium_align--left">
											<SocialIconsList language={localeCode} />
										</Chunk>
									</FlexItem>
									<FlexItem>
										<Flex
											direction={
												!media.isAtMediumUp || media.isAtLargeUp
													? 'column'
													: 'row'
											}
											rowReverse={
												media.isAtMediumUp &&
												!media.isAtLargeUp &&
												!isLoggedIn
											}
											justify={
												media.isAtMediumUp &&
												!media.isAtLargeUp &&
												!isLoggedIn
													? 'spaceBetween'
													: null
											}
										>
											{!isLoggedIn && (
												<FlexItem shrink className="margin--top">
													<Chunk>
														<LanguageSelectInput
															currentLocaleCode={localeCode}
															onChange={onLanguageSelect}
														/>
													</Chunk>
												</FlexItem>
											)}
											<FlexItem shrink>
												<Chunk className="align--center atMedium_align--left margin--top">
													{appBadges}
												</Chunk>
											</FlexItem>
										</Flex>
									</FlexItem>
								</Flex>
							</FlexItem>
						</Flex>
					</Section>
				</Bounds>
			</Stripe>
			<Stripe
				inverted={!isLight}
				className={cx('footerStripe-legal border--none', {
					'footerStripe-legal--isLight': isLight,
				})}
			>
				<Bounds>
					<div className="padding--all">
						<InlineBlockList
							className="text--small align--center atMedium_align--left"
							separator="·"
							items={[
								<span>{`© Meetup ${new Date().getFullYear()}`}</span>,
								...subFooterLinks
							]}
						/>
					</div>
				</Bounds>
			</Stripe>
		</footer>
	);
};

Footer.propTypes = {
	appBadges: PropTypes.element.isRequired,
	className: PropTypes.string,
	createMeetup: PropTypes.shape({
		link: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	}).isRequired,
	isLight: PropTypes.bool,
	isLoggedIn: PropTypes.bool,
	localeCode: PropTypes.string.isRequired,
	linkSets: PropTypes.arrayOf(PropTypes.shape({
		header: PropTypes.string.isRequired,
		items: PropTypes.arrayOf(PropTypes.element).isRequired
	})).isRequired,
	onLanguageSelect: PropTypes.func.isRequired,
	subFooterLinks: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default withMatchMedia(Footer);
