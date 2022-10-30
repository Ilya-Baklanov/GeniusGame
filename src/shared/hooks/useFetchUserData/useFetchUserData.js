/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';

const useFetchUserData = () => {
    const [isFetchUserLoaded, setIsFetchUserLoaded] = useState(false);
    const [fetchedUser, setUser] = useState(null);
    const [fetchedScheme, setScheme] = useState('bright_light');
    const [accessToken, setAccessToken] = useState(null);
    const [userStat, setUserStat] = useState(null);
    const [notificationsState, setNotificationsState] = useState(null);

    const fetchUserCoins = useCallback(async (user) => {
        const keyValue = `${user.id}_geniusGame`;
        const coins = await bridge.send('VKWebAppStorageGet', { keys: [keyValue] });
        setUserStat(coins.keys[0].value);
    }, []);

    // const fetchUserCoins = useCallback(async (user) => {
    //     const response = await fetch(`http://localhost:8080/v1/api/getUserData/${user.id}`, {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': 'localhost:8080',
    //         },
    //     });
    //     if (response.ok) {
    //         const json = await response.json();
    //         console.log(json);
    //         setUserStat(json.coins);
    //         setNotificationsState(json.notifications);
    //     } else {
    //         console.log('error');
    //     }
    // }, []);

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
        await fetch('http://localhost:8080/v1/api/up', requestOptions);
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
        console.log('updateCircumstancesStatus: ', response.json());
    }, []);

    const postWallPhoto = useCallback(async (user, message, token) => {
        const wallPostResult = await bridge.send('VKWebAppShowWallPostBox', {
            owner_id: user.id,
            message,
            attachments: `photo_${user.id},https://sun9-40.userapi.com/impg/jBHJhobGUnuodlbDJOt5WLwGfgyyouFEUCxXHA/v4Z2MEW_0xE.jpg?size=1189x862&quality=96&sign=e02e7521f5996a2124b977d31e00f0b6&type=album`,
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
        refetchUserCoins: fetchUserCoins,
        postEarnedCoins,
        notificationsState,
        updateCircumstancesStatus,
        postWallPhoto,
    };
};

export default useFetchUserData;
