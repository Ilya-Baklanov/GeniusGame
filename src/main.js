import { RouterProvider } from 'react-router-vkminiapps';

import bridge from '@vkontakte/vk-bridge';

import structure from './structure.js';
import { createRoot } from 'react-dom/client';
import { AppConfig } from './AppConfig.js';

// Init VK  Mini App
bridge.send('VKWebAppInit');
bridge.send('VKWebAppSetSwipeSettings', { history: true });

createRoot(document.getElementById('root')).render(<RouterProvider structure={structure}>
<AppConfig />
</RouterProvider>,);

if (import.meta.env.MODE === 'development') {
  import('./eruda.js');
}