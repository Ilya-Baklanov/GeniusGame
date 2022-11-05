/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { POST_MESSAGE, POST_PHOTO_ID } from '../../../assets/constants/constants';

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

    const getUserInfo = useCallback(async (userId) => {
        const userInfo = await bridge.send('VKWebAppGetUserInfo', {
            user_id: userId,
        });
        console.log('GET_USER_INFO: ', userInfo);
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
        console.log('FETCH_USER_STAT: ', data);
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
        console.log('SERVER_TIME: ', json);
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
        const data = await response.json();
        setPlaceInLeaderBoard(data);
        console.log('PLACE_IN_LEADER_BOARD: ', data);
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
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/getTopPlayers', requestOptions);
        const json = await response.json();
        console.log('TOP_PLAYERS', json);
        return json.users;
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
        const data = await response.json();
        setPlaceInFriendsLeaderBoard(data);
        console.log('PLACE_IN_FRIENDS_LEADER_BOARD: ', data);
    }

    const gamersList = [
        { name: '0', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '1', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '2', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '3', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '4', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '5', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '6', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '7', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '8', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '9', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '10', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '111', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '12', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '13', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '14', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '15', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '16', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '17', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '18', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '19', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '20', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '21', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '22', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '23', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '24', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '25', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '26', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '27', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '28', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '29', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '30', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '31', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '32', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '33', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '34', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '35', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '36', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '37', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '38', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '39', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '40', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '41', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '42', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '43', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '44', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '45', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '46', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '47', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '48', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '49', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '50', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '51', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '52', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '53', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '54', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '55', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '56', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '57', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '58', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '59', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '60', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '61', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '62', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '63', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '64', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '65', score: 19087, avatarSrc: 'https://sun7.userapi.com/sun7-15/s/v1/ig2/C1ohN6evNFyooY-IMGnQ8DBPUMVe6SCqeRDiZyXWUeXO899iCkrEUhEgwnrI4srp6n2fRrrZRwGL__FIwkFIX0WI.jpg?size=1440x2160&quality=95&type=album' },
        { name: '66', score: 15030, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '67', score: 10058, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '68', score: 9543, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
        { name: '69', score: 7771, avatarSrc: 'https://windows10free.ru/uploads/posts/2017-02/1487679899_icon-user-640x640.png' },
    ];

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
            }),
        };
        const responseFriends = await fetch('https://sbermemorygame.ru/v1/api/getTopPlayersFriends', requestOptionsFriends);
        const json = await responseFriends.json();
        console.log('TOP_PLAYERS_FRIENDS', json);
        return json.users;
        // return gamersList.slice(start, end + 1);
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
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/up', requestOptions);
        const data = await response.json();
        console.log('UPDATED_USER_DATA: ', data);
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
            }),
        };
        const response = await fetch('https://sbermemorygame.ru/v1/api/updateCirc', requestOptions);
        const data = await response.json();
        console.log('USER_DATA: ', data);
        setUserStat(data);
    }, []);

    const postWallPhoto = useCallback(async (user, token) => {
        const wallPostResult = await bridge.send('VKWebAppShowWallPostBox', {
            owner_id: user.id,
            message: POST_MESSAGE,
            attachments: `photo${POST_PHOTO_ID}`,
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
                userId,
                coins,
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
    }, []);

    const fetchUserData = useCallback(async () => {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        await fetchUserStat(user);
        const token = await fetchToken(user);
        const friendsList = await getFriendList(token);
        await getPlaceInLeaderBoard(user);
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
    };
};

export default useFetchUserData;
