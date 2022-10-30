/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';

const useFetchUserData = () => {
    const [isFetchUserLoaded, setIsFetchUserLoaded] = useState(false);
    const [fetchedUser, setUser] = useState(null);
    const [fetchedScheme, setScheme] = useState('bright_light');
    const [accessToken, setAccessToken] = useState(null);
    const [userStat, setUserStat] = useState(null);
    const [isEarnedCoinsPosted, setIsEarnedCoinsPosted] = useState(false);

    // const fetchUserCoins = useCallback(async (user) => {
    //     setUserStat({
    //         circumstances: '01000',
    //         coins: '777',
    //         gameCount: '1',
    //         notifications: '1',
    //         userId: '752451680',
    //     });
    // }, []);

    const fetchUserCoins = useCallback(async (user) => {
        const response = await fetch(`http://localhost:8080/v1/api/getUserData/${user.id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'localhost:8080',
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('USER_DATA: ', data);
            setUserStat(data);
        } else {
            console.log('error');
        }
    }, []);

    async function getServerTime() {
        const serverTimeResp = await fetch('http://localhost:8080/v1/api/serverTime', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'localhost:8080',
            },
        });
        if (serverTimeResp.ok) {
            const json = await serverTimeResp.json();
            console.log(json);
        }
    }

    async function getPlaceInLeaderBoard(user) {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'localhost:8080',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
            }),
        };
        const response = await fetch('http://localhost:8080/v1/api/getLeaderBoard', requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log('USER_DATA: ', data);
            setUserStat(data);
        } else {
            console.log('error getPlaceInLeaderBoard');
        }
    }

    async function getPlaceInFriendsLeaderBoard(user) {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'localhost:8080',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                friendsList: [1, 2, 3, 4, 5, 105560317],
            }),
        };
        const response = await fetch('http://localhost:8080/v1/api/getLeaderBoardFriends', requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log('USER_DATA: ', data);
            setUserStat(data);
        } else {
            console.log('error getPlaceInLeaderBoard');
        }
    }

    const fetchToken = useCallback(async (user) => {
        try {
            const value = await bridge.send('VKWebAppGetAuthToken', {
                app_id: 51430029,
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
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchUserData = useCallback(async () => {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        await fetchUserCoins(user);
        await fetchToken(user);
        await getPlaceInLeaderBoard(user);
        await getPlaceInFriendsLeaderBoard(user);
        setIsFetchUserLoaded(true);
    }, []);

    const postEarnedCoins = useCallback(async (allEarnedCoins, user) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'localhost:8080',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                coins: allEarnedCoins,
                gameCount: '0',
            }),
        };
        const response = await fetch('http://localhost:8080/v1/api/up', requestOptions);
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
                'Access-Control-Allow-Origin': 'localhost:8080',
            },
            dataType: 'json',
            body: JSON.stringify({
                userId: user.id,
                circumstance: circumstanceIndex,
            }),
        };
        const response = await fetch('http://localhost:8080/v1/api/updateCirc', requestOptions);
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
            attachments: `photo${user.id}_457251018`,
            v: '5.131',
            access_token: token,
        });
        console.log('Result of post photo ', wallPostResult.response);
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
        postEarnedCoins,
        isEarnedCoinsPosted,
        updateCircumstancesStatus,
        postWallPhoto,
    };
};

export default useFetchUserData;
