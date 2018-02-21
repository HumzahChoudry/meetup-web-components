import React from 'react';

import Section from '../../layout/Section';
import Chunk from '../../layout/Chunk';

import Notification from './Notification';

export const NotificationsDropdownComponent = ({
	self,
	notifications,
	onMarkReadAction,
	localeCode
}) => {
	const isEmptyState = notifications.length < 1;

	const NotificationsList = () => (
		<div className="notifications--populated">
			<ul className="list">
				{notifications.map((notif, key) => (
					// TODO: refactor
					// eslint-disable-next-line react/no-array-index-key
					<li key={key}>
						<Notification
							className={key === 0 ? 'border--none' : ''}
							id={notif.id}
							memberId={self.id.toString()}
							kind={notif.kind}
							photoUrl={notif.photo ? notif.photo.photo_link : ''}
							isRead={notif.read}
							link={notif.link}
							onMarkReadAction={onMarkReadAction}
							dangerouslySetInnerHTML={{ __html: notif.text }}
							updated={notif.updated}
							localeCode={localeCode}
						/>
					</li>
				))}
			</ul>
		</div>
	);

	const NotificationsEmpty = () => (
		<Section className="notifications--empty align--center valignChildren--center">
			<Chunk>
				<p>
					You don't have any notifications yet
				</p>
			</Chunk>
		</Section>
	);

	return (
		<div className="align--left">
			<h2 className="padding--all border--bottom text--labelSecondary">
				Notifications
			</h2>
			{isEmptyState ? <NotificationsEmpty /> : <NotificationsList />}
		</div>
	);
};

export default NotificationsDropdownComponent;
