/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

const useFetchUserData = () => {
    const [isFetchUserLoaded, setIsFetchUserLoaded] = useState(false);
    const [isEarnedCoinsPosted, setIsEarnedCoinsPosted] = useState(false);
    const [fetchedUser, setUser] = useState(null);
    const [fetchedScheme, setScheme] = useState('bright_light');
    const [accessToken, setAccessToken] = useState(null);
    const [amountCoins, setAmountCoins] = useState(null);
    const [notificationsState, setNotificationsState] = useState(null);

    async function fetchUserCoins(user) {
        const keyValue = `${user.id}_geniusGame`;
        const coins = await bridge.send('VKWebAppStorageGet', { keys: [keyValue] });
        setAmountCoins(coins.keys[0].value);
    }

    // async function fetchUserCoins(user) {
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
    //         setAmountCoins(json.coins);
    //         setNotificationsState(json.notifications);
    //     } else {
    //         console.log('error');
    //     }
    // }

    async function fetchToken(user) {
        try {
            const value = await bridge.send('VKWebAppGetAuthToken', {
                app_id: 51430029,
                scope: 'friends,groups,wall',
            });
            console.log(value);
            setAccessToken(value.access_token);
            const result = bridge.send(
                'VKWebAppStorageSet',
                {
                    key: `${user.id}_token`,
                    value: value.access_token,
                },
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchUserData() {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        await fetchUserCoins(user);
        await fetchToken(user);
        setIsFetchUserLoaded(true);
    }

    async function postEarnedCoins(allEarnedCoins, user) {
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
        console.log('COinsUPDATED', allEarnedCoins);
    }

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
        amountCoins,
        refetchUserCoins: fetchUserCoins,
        postEarnedCoins,
        isEarnedCoinsPosted,
        notificationsState,
    };
};

export default useFetchUserData;
