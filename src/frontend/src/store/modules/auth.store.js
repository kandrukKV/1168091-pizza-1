import { SET_IS_AUTH, SET_USER } from "../mutations-types";

export default {
  namespaced: true,
  state: {
    isAuth: false,
    user: null,
  },
  getters: {
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },
  mutations: {
    [SET_IS_AUTH](state, value) {
      state.isAuth = value;
    },
    [SET_USER](state, user) {
      state.user = user;
    },
  },
  actions: {
    async initialUser({ dispatch, commit }) {
      if (this.$jwt.getToken()) {
        this.$api.auth.setAuthHeader();
        dispatch("getMe");
        commit(SET_IS_AUTH, true);
      }
    },
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(SET_IS_AUTH, false);
      commit(SET_USER, null);
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getCurrentUser();
        commit(SET_IS_AUTH, true);
        commit(SET_USER, data);
      } catch (e) {
        dispatch("logout", false);
      }
    },
  },
};
