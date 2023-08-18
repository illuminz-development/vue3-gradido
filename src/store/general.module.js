const initialState = {
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: false,
    showSidenav: true,
    showNavbar: true,
    showMain: true,
    layout: "default"
}

export const general = {
  namespaced: true,
  state: initialState,
  actions: {
    toggleSidebarColor({ commit }, payload) {
        commit("sidebarType", payload);
    }
  },
  mutations: {
    navbarMinimize(state) {
        const sidenav_show = document.querySelector(".g-sidenav-show");

        if (sidenav_show.classList.contains("g-sidenav-hidden")) {
            sidenav_show.classList.remove("g-sidenav-hidden");
            sidenav_show.classList.add("g-sidenav-pinned");
            state.isPinned = true;
        } else {
            sidenav_show.classList.add("g-sidenav-hidden");
            sidenav_show.classList.remove("g-sidenav-pinned");
            state.isPinned = false;
        }
    },
    sidebarType(state, payload) {
        state.sidebarType = payload;
    },
    navbarFixed(state) {
        if (state.isNavFixed === false) {
            state.isNavFixed = true;
        } else {
            state.isNavFixed = false;
        }
    }
  }
};