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

    // async function fetchUserCoins(user) {
    //     const keyValue = `${user.id}_geniusGame`;
    //     const coins = await bridge.send('VKWebAppStorageGet', { keys: [keyValue] });
    //     setAmountCoins(coins.keys[0].value);
    // }

    async function fetchUserCoins(user) {
        const response = await fetch(`http://localhost:8080/v1/api/getUserData/${user.id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'localhost:8080',
            },
        });
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            setAmountCoins(json.coins);
        } else {
            console.log('error');
        }
    }

    async function fetchTokenFromStorage(user) {
        const keyValue = `${user.id}_token`;
        const token = await bridge.send('VKWebAppStorageGet', { keys: [keyValue] });
        setAccessToken(token.keys[0].value);
        console.log('from storage');
        console.log(token.keys[0].value);
    }

    async function fetchToken(user) {
        try {
            const value = await bridge.send('VKWebAppGetAuthToken', {
                app_id: 51430029,
                scope: 'friends,groups',
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
        await fetchTokenFromStorage(user);
        await fetchToken(user);
        setIsFetchUserLoaded(true);
    }

    async function postEarnedCoins(keyValue, allEarnedCoins) {
        bridge.send(
            'VKWebAppStorageSet',
            {
                key: keyValue,
                value: String(allEarnedCoins),
            },
        ).then(() => setIsEarnedCoinsPosted(true));
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
    };
};

export default useFetchUserData;
