import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-vkminiapps';

import bridge from '@vkontakte/vk-bridge';

import structure from './structure';
import App from './App';

// Init VK  Mini App
bridge.send('VKWebAppInit');
bridge.send('VKWebAppSetSwipeSettings', { history: true });

ReactDOM.render(
  <RouterProvider structure={structure}>
    <App />
  </RouterProvider>,
  document.getElementById('root'),
);
if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}); // runtime download
}
