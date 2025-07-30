import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "leaflet/dist/leaflet.css";
import "prismjs/themes/prism-okaidia.css"; // or prism-dark.css
import Prism from "prismjs";

import { WebApp } from "@elo/core";
// if IXConnection is needed
import de from '@elo/eloixclient';
// if ELO session is needed
import { Session } from "@elo/session";

Vue.directive("prism", {
  inserted(el) {
    Prism.highlightAllUnder(el);
  },
});

Vue.config.productionTip = false;

WebApp.setOnLoad(function () {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});

Session.init(de.elo.ix.client);
