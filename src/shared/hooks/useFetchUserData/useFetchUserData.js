/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

const useFetchUserData = () => {
    const [isFetchUserLoaded, setIsFetchUserLoaded] = useState(false);
    const [fetchedUser, setUser] = useState(null);
    const [fetchedScheme, setScheme] = useState('bright_light');
    const [accessToken, setAccessToken] = useState(null);
    const [amountCoins, setAmountCoins] = useState(null);

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                setScheme(data.scheme);
            }
        });

        async function fetchUserCoins(user) {
            const keyValue = `${user.id}_geniusGame`;
            const coins = await bridge.send('VKWebAppStorageGet', { keys: [keyValue] });
            console.log(coins);
            setAmountCoins(coins.keys[0].value);
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
                    scope: 'friends',
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
            setIsFetchUserLoaded(true);
            fetchUserCoins(user);
            fetchTokenFromStorage(user);
            fetchToken(user);
        }
        fetchUserData();
    }, []);

    return {
        isFetchUserLoaded, fetchedUser, fetchedScheme, accessToken, amountCoins,
    };
};

export default useFetchUserData;
