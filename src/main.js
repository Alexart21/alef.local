import {createApp} from "vue";

import App from '@/App';
import store from '@/store';
import router from '@/router';

// import mdiVue from 'mdi-vue/v3'
// import * as mdijs from '@mdi/js'
// import  { mdiAbacus, mdiAccount }  from '@mdi/js'


createApp(App)
.use(store)
.use(router)
.mount('#app');

import './assets/css/bootstrap.min.css';
import './assets/css/styles.css';
