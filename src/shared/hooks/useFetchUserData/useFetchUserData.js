/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';

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

    // const fetchUserStat = useCallback(async (user) => {
    //     setIsFetchUserStatLoaded(false);
    //     setUserStat({
    //         circumstances: '01000',
    //         coins: '777',
    //         gameCount: '1',
    //         notifications: '0',
    //         userId: '752451680',
    //     });
    //     setTimeout(() => setIsFetchUserStatLoaded(true), 1500);
    // }, []);

    // PROD
    const fetchUserStat = useCallback(async (user) => {
        setIsFetchUserStatLoaded(false);
        const response = await fetch(`https://sbermemorygame.ru/v1/api/getUserData/${user.id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('USER_DATA: ', data);
            setUserStat(data);
            setIsFetchUserStatLoaded(true);
        } else {
            console.log('error');
        }
    }, []);

    // const getServerTime = useCallback(async () => {
    //     setServerTime('10:01:50');
    // }, []);

    const getServerTime = useCallback(async () => {
        const serverTimeResp = await fetch('https://sbermemorygame.ru/v1/api/serverTime', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
        });
        if (serverTimeResp.ok) {
            const json = await serverTimeResp.json();
            console.log('SERVER_TIME: ', json);
            setServerTime(json.serverTime);
        }
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
        console.log('FRIEND_LIST: ', list);
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
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/getPlaceInTop', requestOptions);
        if (response.ok) {
            const data = await response.json();
            setPlaceInLeaderBoard(data);
            console.log('PLACE_IN_LEADER_BOARD: ', data);
        } else {
            console.log('error getPlaceInLeaderBoard');
        }
    }

    const getTopPlayers = useCallback(async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'sbermemorygame.ru',
            },
            dataType: 'json',
            body: JSON.stringify({
                left: 0,
                right: 20,
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/getTopPlayers', requestOptions);
        if (response.ok) {
            const json = await response.json();
            setTopPlayers(json.users);
            console.log('TOP_PLAYERS', json);
        } else {
            console.log('error');
        }
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
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/getPlaceInTopFriends', requestOptions);
        if (response.ok) {
            const data = await response.json();
            setPlaceInFriendsLeaderBoard(data);
            console.log('PLACE_IN_FRIENDS_LEADER_BOARD: ', data);
        } else {
            console.log('error getPlaceInLeaderBoard');
        }
    }

    const getTopPlayersFriends = useCallback(async (friendsList) => {
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
                left: 0,
                right: 20,
                friendsList: [...friendsIdList],
            }),
        };
        const responseFriends = await fetch('https://sbermemorygame.ru/v1/api/getTopPlayersFriends', requestOptionsFriends);
        if (responseFriends.ok) {
            const json = await responseFriends.json();
            setTopPlayersFriends(json.users);
            console.log('TOP_PLAYERS_FRIENDS', json);
        } else {
            console.log('error');
        }
    }, []);

    const fetchToken = useCallback(async (user) => {
        const value = await bridge.send('VKWebAppGetAuthToken', {
            app_id: 51435598,
            scope: 'friends,groups,wall',
        });
        console.log(value);
        setAccessToken(value.access_token);
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: `${user.id}_token`,
                value: value.access_token,
            },
        );

        return value.access_token;
    }, []);

    const postEarnedCoins = useCallback(async (allEarnedCoins, user) => {
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
                gameCount: '0',
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/up', requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log('UPDATED_USER_DATA: ', data);
            setUserStat(data);
            setIsEarnedCoinsPosted(true);
        } else {
            console.log('error postEarnedCoins');
        }

        console.log('Coins_UPDATED', allEarnedCoins);
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
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/updateCirc', requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log('USER_DATA: ', data);
            setUserStat(data);
        } else {
            console.log('error updateCircumstancesStatus');
        }
    }, []);

    const postWallPhoto = useCallback(async (user, message, token) => {
        const wallPostResult = await bridge.send('VKWebAppShowWallPostBox', {
            owner_id: user.id,
            message,
            attachments: `photo${user.id}_457244137`,
            v: '5.131',
            access_token: token,
        });
        console.log('Result of post photo ', wallPostResult.response);
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
                userId, // тут юзер должен приходить
                coins, // тут должна быть цена купона, а не колво очков юзера
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
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/updateNotificationStatus', requestOptions);
        const json = await response.json();

        return json.notifications;
        // fetchUserData(user);
    }, []);

    const fetchUserData = useCallback(async () => {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        await fetchUserStat(user);
        const token = await fetchToken(user);
        const friendsList = await getFriendList(token);
        await getPlaceInLeaderBoard(user);
        await getTopPlayers();
        await getTopPlayersFriends(friendsList);
        await getPlaceInFriendsLeaderBoard(user, friendsList);
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
    };
};

export default useFetchUserData;
