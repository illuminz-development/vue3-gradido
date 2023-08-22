import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import setupInterceptors from './services/setupInterceptors';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import VueSimpleAlert from "vue3-simple-alert-next";

setupInterceptors(router);

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(VueSimpleAlert);
appInstance.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAP_KEY,
        libraries: "places"
        // language: 'de',
    },
});
appInstance.use(ArgonDashboard);
appInstance.mount("#app");