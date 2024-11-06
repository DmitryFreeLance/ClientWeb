import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { createApp } from 'vue';

import '../css/style.scss';

import App from './components/App.vue';

const app = createApp(App);
app.mount('#app');