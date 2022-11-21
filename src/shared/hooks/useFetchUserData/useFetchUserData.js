/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { POST_MESSAGE, POST_PHOTO_ID } from '../../../assets/constants/constants';
// import { topPlayersResponse } from './topPlayersResponse';

const useFetchUserData = () => {
    const [isFetchUserLoaded, setIsFetchUserLoaded] = useState(false);
    const [fetchedUser, setUser] = useState(null);
    const [fetchedScheme, setScheme] = useState('bright_light');
    const [accessToken, setAccessToken] = useState(null);
    const [isFetchUserStatLoaded, setIsFetchUserStatLoaded] = useState(false);
    const [userStat, setUserStat] = useState(null);
    const [isEarnedCoinsPosted, setIsEarnedCoinsPosted] = useState(false);
    const [serverTime, setServerTime] = useState('');
    const [friendList, setFriendList] = useState(null);
    const [placeInLeaderBoard, setPlaceInLeaderBoard] = useState(null);
    const [topPlayers, setTopPlayers] = useState(null);
    const [placeInFriendsLeaderBoard, setPlaceInFriendsLeaderBoard] = useState(null);
    const [topPlayersFriends, setTopPlayersFriends] = useState(null);
    const [launchParams, setLaunchParams] = useState(null);

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
        const response = await fetch(`https://sbermemorygame.ru/v1/api/getUserData/${user.id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
        });
        const data = await response.json();
        console.log('RESPONSE_fetchUserStat: ', data);
        setUserStat(data);
        setIsFetchUserStatLoaded(true);
    }, [userStat]);

    const getServerTime = useCallback(async () => {
        const serverTimeResp = await fetch('https://sbermemorygame.ru/v1/api/serverTime', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
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
                v: '5.131',
                access_token: token,
            },
        });
        setFriendList(list.response.items);
        return list.response.items;
    }, []);

    async function getPlaceInLeaderBoard(user) {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/getPlaceInTop', requestOptions);
        const data = await response.json();
        setPlaceInLeaderBoard(data);
    }

    const getTopPlayers = useCallback(async (start, end) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                left: start,
                right: end,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/getTopPlayers', requestOptions);
        const json = await response.json();
        return json.users;
        // return topPlayersResponse.users.slice(start, end);
    }, []);

    async function getPlaceInFriendsLeaderBoard(user, friendsList) {
        const friendsIdList = friendsList.map((friends) => friends.id);

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                friendsList: [...friendsIdList, user.id],
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/getPlaceInTopFriends', requestOptions);
        const data = await response.json();
        setPlaceInFriendsLeaderBoard(data);
    }

    const getTopPlayersFriends = useCallback(async (friendsList, start, end) => {
        const friendsIdList = friendsList.map((friends) => friends.id);

        const requestOptionsFriends = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                left: start,
                right: end,
                friendsList: [...friendsIdList],
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const responseFriends = await fetch('https://sbermemorygame.ru/v1/api/getTopPlayersFriends', requestOptionsFriends);
        const json = await responseFriends.json();
        return json.users;
        // return topPlayersResponse.users.slice(start, end);
    }, []);

    const fetchFriendsToken = useCallback(async (user) => {
        const value = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 51435598,
            scope: 'friends',
        });
        setAccessToken(value.access_token);
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: `${user.id}_token`,
                value: value.access_token,
            },
        );
        console.log(window.location.href.split('?')[1]);
        return value.access_token;
    }, []);

    const fetchGroupsToken = useCallback(async (user) => {
        const value = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 51435598,
            scope: 'groups',
        });
        setAccessToken(value.access_token);
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: `${user.id}_token`,
                value: value.access_token,
            },
        );
        console.log(window.location.href.split('?')[1]);
        return value.access_token;
    }, []);

    const fetchWallToken = useCallback(async (user) => {
        const value = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 51435598,
            scope: 'wall',
        });
        setAccessToken(value.access_token);
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: `${user.id}_token`,
                value: value.access_token,
            },
        );
        console.log(window.location.href.split('?')[1]);
        return value.access_token;
    }, []);

    const postEarnedCoins = useCallback(async (allEarnedCoins, user, gameCountChange) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                coins: allEarnedCoins,
                gameCount: gameCountChange,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/up', requestOptions);
        const data = await response.json();
        setUserStat(data);
        setIsEarnedCoinsPosted(true);
    }, []);

    const updateCircumstancesStatus = useCallback(async (user, circumstanceIndex) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                circumstance: circumstanceIndex,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/updateCirc', requestOptions);
        const data = await response.json();
        setUserStat(data);
    }, []);

    const postWallPhoto = useCallback(async (user, token) => {
        const response = await bridge.send('VKWebAppShowStoryBox', {
            background_type: 'image',
            url: 'https://sun9-8.userapi.com/impg/MIzRsgznJZPCXjMYHp-u8fvXKvGfoLPQge52yg/gECD7hxKOZI.jpg?size=607x1080&quality=95&sign=23d8f94f47955a6dbeef68984af4194b&type=album',
            attachment: {
                text: 'book',
                type: 'photo',
                owner_id: user.id,
                id: 12345678,
            },
        });
            // .then((data) => {
            //     if (data.code_data) {
            //         // Редактор истории открыт
            //     }
            // })
            // .catch((error) => {
            //     // Ошибка
            //     console.log(error);
            // });
        return response;
    }, []);

    const getPromoCode = useCallback(async (userId, coins) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId,
                coins,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/getPromo/', requestOptions);
        const json = await response.json();
        return json.promo;
    }, []);

    const updateNotificationStatus = useCallback(async (user, notificationStatus) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user,
                notifications: notificationStatus,
                vkToken: window.location.href.split('?')[1],
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/updateNotificationStatus', requestOptions);
        const json = await response.json();
        setUserStat((prev) => ({
            ...prev,
            notifications: json.notifications,
        }));
        return json.notifications;
    }, []);

    const fetchUserData = useCallback(async () => {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        await fetchUserStat(user);
        // const friendsToken = await fetchFriendsToken(user);
        // const friendsList = await getFriendList(friendsToken);
        // await getPlaceInLeaderBoard(user);
        // await getPlaceInFriendsLeaderBoard(user, friendsList);
        await getServerTime();
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
        accessToken,
        userStat,
        refetchUserStat: fetchUserStat,
        isFetchUserStatLoaded,
        postEarnedCoins,
        isEarnedCoinsPosted,
        updateCircumstancesStatus,
        postWallPhoto,
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
    };
};

export default useFetchUserData;
