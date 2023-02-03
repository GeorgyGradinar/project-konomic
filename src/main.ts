import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {store, key} from '@/store';
import vuetify from './plugins/vuetify';
import {loadFonts} from './plugins/webfontloader';

loadFonts();

createApp(App)
    .use(store, key)
    .use(router)
    .use(vuetify)
    .mount('#app')
