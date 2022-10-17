/* eslint-disable no-plusplus */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Observable, pipe } from 'rxjs';

const useFetchFriendList = (accessToken) => {
	const [friendList, setFriendList] = useState(null);

	useEffect(() => {
		console.log(accessToken);
		async function getFriendList() {
			const list = await bridge.send('VKWebAppCallAPIMethod', {
				method: 'friends.get',
				request_id: '32test',
				params: {
					order: 'random',
					fields: 'first_name,last_name,photo_100',
					v: '5.131',
					access_token: accessToken,
				},
			});
			console.log(list.response.count);
			const array = {};
			for (let i = 0; i < list.response.count; i++) {
				console.log(`${list.response.items[i].first_name} ${list.response.items[i].last_name}`);
				array[i] = {
					name: `${list.response.items[i].first_name} ${list.response.items[i].last_name}`,
					score: 0,
					avatarSrc: list.response.items[i].photo_100,
				};
			}
			setFriendList(array);
		}
		getFriendList();
	}, []);

	return { friendList };
};

export default useFetchFriendList;
