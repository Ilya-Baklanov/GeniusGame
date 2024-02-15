/* eslint-disable max-len */
/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { POST_MESSAGE, POST_PHOTO_ID, RATING_LIMIT } from '../../../assets/constants/constants';
// import { topPlayersResponse } from './topPlayersResponse';

const useFetchUserData = () => {
    const [isFetchUserLoaded, setIsFetchUserLoaded] = useState(false);
    const [fetchedUser, setUser] = useState(null);
    const [fetchedScheme, setScheme] = useState('bright_light');
    const [isFetchUserStatLoaded, setIsFetchUserStatLoaded] = useState(false);
    const [userStat, setUserStat] = useState(null);
    const [isEarnedCoinsPosted, setIsEarnedCoinsPosted] = useState(false);
    const [serverTime, setServerTime] = useState('');
    const [friendList, setFriendList] = useState(null);
    const [placeInLeaderBoard, setPlaceInLeaderBoard] = useState(null);
    const [topPlayers, setTopPlayers] = useState([]);
    const [placeInFriendsLeaderBoard, setPlaceInFriendsLeaderBoard] = useState(null);
    const [topPlayersFriends, setTopPlayersFriends] = useState([]);
    const [promocodesList, setPromocodesList] = useState();
    const [launchParams, setLaunchParams] = useState(null);

    // console.log('token_outside: ', window.location.href.split('?')[1]);

    const getAllowed = useCallback(async (type) => {
        const { result } = await bridge.send('VKWebAppCheckAllowedScopes', {
            scopes: type,
        });
        return result;
    }, []);

    const getUserInfo = useCallback(async (userId) => {
        const userInfo = await bridge.send('VKWebAppGetUserInfo', {
            user_id: userId,
        });
        return userInfo;
    }, []);

    const fetchUserStat = useCallback(async (user) => {
        if (!userStat) {
            setIsFetchUserStatLoaded(false);
        }

        const token = window.location.href.split('?')[1];

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                vkToken: token,
            }),
        };
        const response = await fetch(`https://sbermemory.ru/v1/api/getUserData/${user.id}`, requestOptions);

        const data = await response.json();
        setUserStat(data);
        setIsFetchUserStatLoaded(true);
        return data;
    }, [userStat]);

    const getServerTime = useCallback(async () => {
        const serverTimeResp = await fetch('https://sbermemory.ru/v1/api/serverTime', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
        });
        const json = await serverTimeResp.json();
        setServerTime(json.serverTime);
        // setServerTime('21:59:50');
    }, []);

    const getFriendList = useCallback(async (token) => {
        const list = await bridge.send('VKWebAppCallAPIMethod', {
            method: 'friends.get',
            request_id: 'geT_friends_list',
            params: {
                order: 'random',
                fields: 'first_name,last_name,photo_100',
                v: '5.199',
                access_token: token,
            },
        });
        setFriendList(list.response.items);
        return list.response.items;
    }, []);

    const getPlaceInLeaderBoard = useCallback(async (user) => {
        const token = window.location.href.split('?')[1];

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                vkToken: token,
            }),
        };
        const response = await fetch('https://sbermemory.ru/v1/api/getPlaceInTop', requestOptions);
        const data = await response.json();
        setPlaceInLeaderBoard(data);
    }, []);

    const getTopPlayers = useCallback(async (start, end) => {
        // console.log('token_inside_getTopPlayers: ', window.location.href.split('?')[1]);

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                left: start,
                right: end,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemory.ru/v1/api/getTopPlayers', requestOptions)
            .catch((error) => console.error('getTopPlayers_error: ', error));
        const json = await response.json();
        setTopPlayers(json.users);
        return json.users;
        // return topPlayersResponse.users.slice(start, end);
    }, []);

    const getPlaceInFriendsLeaderBoard = useCallback(async (user, friendsList) => {
        const friendsIdList = friendsList.map((friends) => friends.id);
        const token = window.location.href.split('?')[1];

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                friendsList: [...friendsIdList, user.id],
                vkToken: token,
            }),
        };
        const response = await fetch('https://sbermemory.ru/v1/api/getPlaceInTopFriends', requestOptions);
        const data = await response.json();
        setPlaceInFriendsLeaderBoard(data);
    }, []);

    const getTopPlayersFriends = useCallback(async (friendsList, user, start, end) => {
        const friendsIdList = friendsList?.map((friends) => friends.id);

        const requestOptionsFriends = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                left: start,
                right: end,
                friendsList: [...friendsIdList, user.id],
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const responseFriends = await fetch('https://sbermemory.ru/v1/api/getTopPlayersFriends', requestOptionsFriends)
            .catch((error) => console.error('getTopPlayersFriends_error: ', error));
        const json = await responseFriends.json();
        setTopPlayersFriends(json.users);
        return json.users;
        // return topPlayersResponse.users.slice(start, end);
    }, []);

    const fetchFriendsToken = useCallback(async (user) => {
        const value = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 51435598,
            scope: 'friends',
        });
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: `${user.id}_token`,
                value: value.access_token,
            },
        );
        return value.access_token;
    }, []);

    const fetchGroupsToken = useCallback(async (user) => {
        const value = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 51435598,
            scope: 'groups',
        });
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: `${user.id}_token`,
                value: value.access_token,
            },
        );
        return value.access_token;
    }, []);

    const fetchStoriesToken = useCallback(async (user) => {
        const value = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 51435598,
            scope: 'stories',
        });
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: `${user.id}_token`,
                value: value.access_token,
            },
        );
        return value.access_token;
    }, []);

    const fetchStatusToken = useCallback(async (user) => {
        const value = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 51435598,
            scope: 'status',
        });
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: `${user.id}_token`,
                value: value.access_token,
            },
        );
        return value.access_token;
    }, []);

    const postEarnedCoins = useCallback(async (allEarnedCoins, user, gameCountChange, circsIndex) => {
        setIsEarnedCoinsPosted(false);
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                coins: allEarnedCoins,
                gameCount: gameCountChange,
                circumstances: circsIndex,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemory.ru/v1/api/up', requestOptions);
        const data = await response.json();
        await getTopPlayers(0, RATING_LIMIT);
        setUserStat(data);
        setIsEarnedCoinsPosted(true);
    }, []);

    const updateCircumstancesStatus = useCallback(async (user, circumstanceIndex) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                circumstance: circumstanceIndex,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemory.ru/v1/api/updateCirc', requestOptions);
        const data = await response.json();
        setUserStat(data);
    }, []);

    const postStoriesPhoto = useCallback(async (user, token) => {
        const response = await bridge.send('VKWebAppShowStoryBox', {
            background_type: 'image',
            url: 'https://sun9-73.userapi.com/impg/PuiZNJVibvBh35I1uBly4Ur6KrwCNvFFLl-6-A/LfpjW_sfgJ4.jpg?size=375x812&quality=95&sign=5b015a68ef6fbff7fce79e36382492b2&type=album',
            attachment: {
                text: 'book',
                type: 'photo',
                owner_id: user.id,
                id: 12345678,
            },
        });
        return response;
    }, []);

    const getPromoCode = useCallback(async (userId, coins) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId,
                coins,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemory.ru/v1/api/getPromo/', requestOptions);
        const json = await response.json();
        return json.promo;
    }, []);

    const updateNotificationStatus = useCallback(async (user, notificationStatus) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user,
                notifications: notificationStatus,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemory.ru/v1/api/updateNotificationStatus', requestOptions);
        const json = await response.json();
        setUserStat((prev) => ({
            ...prev,
            notifications: json.notifications,
        }));
        return json.notifications;
    }, []);

    const getUserPromoCodes = useCallback(async (user) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemory.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemory.ru/v1/api/getUserPromoCodes', requestOptions);
        const data = await response.json();
        setPromocodesList(data.promoList);
        return data;
    }, []);

    const setStatus = useCallback(async (statusId) => {
        let statusToken = null;
        if (fetchedUser) {
            statusToken = await fetchStatusToken(fetchedUser);
        }
        if (statusToken) {
            const response = await bridge.send('VKWebAppCallAPIMethod', {
                method: 'status.setImage',
                params: {
                    status_id: statusId,
                    access_token: statusToken,
                    v: '5.199',
                },
            }).catch((error) => console.log('GET_STATUS_ERROR: ', error));

            return { statusToken, response };
        }
        return { statusToken };
    }, [fetchedUser]);

    const getStatus = useCallback(async () => {
        const statusToken = await fetchStatusToken(fetchedUser);
        if (statusToken) {
            const response = await bridge.send('VKWebAppCallAPIMethod', {
                method: 'status.getImage',
                params: {
                    access_token: statusToken,
                    v: '5.199',
                },
            }).catch((error) => console.log('GET_STATUS_ERROR: ', error));

            return { statusToken, response };
        }
        return { statusToken };
    }, [fetchedUser]);

    const fetchUserData = useCallback(async () => {
        await getServerTime();
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        await fetchUserStat(user);
        await getPlaceInLeaderBoard(user);
        await getTopPlayers(0, RATING_LIMIT);
        await getUserPromoCodes(user);
        setIsFetchUserLoaded(true);
    }, []);

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                setScheme(data.scheme);
            }
        });
        fetchUserData();
    }, []);

    return {
        getUserInfo,
        isFetchUserLoaded,
        fetchedUser,
        fetchedScheme,
        userStat,
        refetchUserStat: fetchUserStat,
        isFetchUserStatLoaded,
        postEarnedCoins,
        isEarnedCoinsPosted,
        updateCircumstancesStatus,
        postStoriesPhoto,
        getServerTime,
        serverTime,
        getPromoCode,
        updateNotificationStatus,
        getFriendList,
        friendList,
        getPlaceInLeaderBoard,
        placeInLeaderBoard,
        getTopPlayers,
        topPlayers,
        getPlaceInFriendsLeaderBoard,
        placeInFriendsLeaderBoard,
        getTopPlayersFriends,
        topPlayersFriends,
        fetchFriendsToken,
        fetchStoriesToken,
        fetchGroupsToken,
        getAllowed,
        fetchStatusToken,
        getUserPromoCodes,
        promocodesList,
        setStatus,
        getStatus,
    };
};

export default useFetchUserData;
