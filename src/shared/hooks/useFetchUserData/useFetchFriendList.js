/* eslint-disable no-plusplus */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

const useFetchFriendList = (accessToken) => {
	const [friendList, setFriendList] = useState(null);

	console.log('ACCESS_TOKEN: ', accessToken);
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

		console.log('RESPONSE_LIST: ', list.response);

		const array = list.response.items.map((item) => ({
			name: `${item.first_name} ${item.last_name}`,
			score: 0,
			avatarSrc: item.photo_100,
		}));
		setFriendList(array);

		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'localhost:8080',
			},
			dataType: 'json',
			body: JSON.stringify({
				left: 5, // Здесь можно указывать границы
				right: 7,
			}),
		};
		const response = await fetch('http://localhost:8080/v1/api/getTopPlayers', requestOptions);
		if (response.ok) {
			const json = await response.json();
			console.log(json);
		} else {
			console.log('error');
		}
		return response.json();
	}

	useEffect(() => {
		getFriendList();
	}, []);

	return friendList;
};

export default useFetchFriendList;
