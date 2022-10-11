/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

const useFetchUserData = () => {
    const [isFetchUserLoaded, setIsFetchUserLoaded] = useState(false);
    const [fetchedUser, setUser] = useState(null);
    const [fetchedScheme, setScheme] = useState('bright_light');

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                setScheme(data.scheme);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setIsFetchUserLoaded(true);
        }
        fetchData();
    }, []);

    return { isFetchUserLoaded, fetchedUser, fetchedScheme };
};

export default useFetchUserData;
