import React from 'react';
import cx from 'classnames';

/**
 * @module TabsListTab
 *
 * Direct child of `TabsList`.
 * Renders individual tab control.
 * Accepts a `selected` prop.
 */
export class TabsListTab extends React.Component {
	render() {
		const {
			children,
			className,
			selected,
			onClick,
			tabsRef,
			tabsIndex,
			...other
		} = this.props;

		const classNames = cx(
			'tabs-tab',
			{
				'tabs-tab--selected': selected
			},
			className
		);

		return (
			<li
				role='tab'
				id={`${tabsRef}_tab_${tabsIndex}`}
				aria-controls={`${tabsRef}_panel_${tabsIndex}`}
				onClick={onClick}
				className={classNames}
				{...other}>
				{children}
			</li>
		);
	}
}
TabsListTab.propTypes = {
	selected: React.PropTypes.bool,
	onClick: React.PropTypes.func,
};
TabsListTab.defaultProps = {
	selected: false,
};

/**
 * @module TabsList
 * Direct child of `Tabs`.
 * Renders a `nav` and `ul` to contain tab conrols
 */
export class TabsList extends React.Component {
	renderChildren() {
		const { tabsRef, children } = this.props;

		return React.Children.map(children, (kid, tabsIndex) => {
			return React.cloneElement(kid, { tabsRef, tabsIndex });
		});
	}
	render() {
		const tabsListProps = Object.assign({}, this.props);
		const {
			className,
			full,
			...other
		} = tabsListProps;

		const classNames = cx(
			'tabs',
			{
				'tabs--full': full
			},
			className
		);

		// remove non-standard DOM attributes before render returns
		delete tabsListProps.tabsRef;

		return (
			<nav className='chunk'>
				<ul
					role='tablist'
					className={classNames}
					{...other}>
					{this.renderChildren()}
				</ul>
			</nav>
		);
	}
}
TabsList.propTypes = {
	full: React.PropTypes.bool,
	children(props, propName, componentName) {
		const prop = props[propName];
		let error = null;
		React.Children.forEach(prop, child => {
			if (child.type !== TabsListTab) {
				error = new Error('Children of TabsList must be of type: "TabsListTab"');
			}
		});
		return error;
	}
};
TabsList.defaultProps = {
	full: false
};

/**
 * @module TabsPanel
 * Direct child of `Tabs`.
 * Contains panel content rendered under `TabsList`.
 * a `TabsPanel` is visible when the `selected` prop is passed.
 */
export class TabsPanel extends React.Component {
	render() {
		const {
			children,
			className,
			selected,
			tabsRef,
			tabsIndex,
			...other
		} = this.props;

		const classNames = cx(
			'tabs-panel',
			{
				'display--none': !selected
			},
			className
		);

		return (
			<div
				role='tabpanel'
				id={`${tabsRef}_panel_${tabsIndex}`}
				aria-labelledby={`${tabsRef}_tab_${tabsIndex}`}
				aria-hidden={!selected}
				className={classNames}
				{...other}>
				{children}
			</div>
		);
	}
}
TabsPanel.propTypes = {
	selected: React.PropTypes.bool
};
TabsPanel.defaultProps = {
	selected: false
};

/**
 * @module Tabs
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#tabs}
 * Parent for composite Tabs component
 *
 * The `tabsRef` prop provides a unique identifier for providing aria attributes
 */
export class Tabs extends React.Component {
	renderChildren() {
		const { tabsRef, children } = this.props;

		return (
			<div>
				{
					React.Children.map(children, (kid, tabsIndex) => {
						// pass `tabsRef` prop to list and panel children
						if (kid.type === TabsList || kid.type === TabsPanel) {
							return React.cloneElement(kid, { tabsRef, tabsIndex });
						} else {
							return <div>Nope</div>;
						}
					})
				}
			</div>
		);
	}
	render() {
		const children = this.renderChildren();
		const tabsProps = Object.assign({}, this.props);
		const {
			className,
			...other
		} = tabsProps;

		// remove non-standard DOM attributes before render returns
		delete tabsProps.tabsRef;

		return (
			<div
				className={className}
				{...other}>
				{children}
			</div>
		);
	}
}
Tabs.propTypes = {
	tabsRef: React.PropTypes.string.isRequired,
};

