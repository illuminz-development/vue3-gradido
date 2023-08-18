import { createStore } from "vuex";
import { auth } from "./auth.module";
import { general } from "./general.module";

const store = createStore({
  modules: {
    auth,
    general
  }
});

export default store;