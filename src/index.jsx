import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';

// import './assets/fonts/SBSansDisplay-Bold.otf';
// import './assets/fonts/SBSansDisplay-Light.otf';
// import './assets/fonts/SBSansDisplay-Regular.otf';
// import './assets/fonts/SBSansDisplay-SemiBold.otf';
// import './assets/fonts/SBSansDisplay-Thin.otf';
import App from './App';

// Init VK  Mini App
bridge.send('VKWebAppInit');

ReactDOM.render(<App />, document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}); // runtime download
}
