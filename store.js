import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      userLogged: null,
      views: {
        dialogForm: {
          dialogDetails: false,
        },
        agenda: {
          dialogForm: false,
        },
      },
    };
  },
  getters: {
    getUserLogged(state) {
      return state.userLogged;
    },
    getSelectType(state) {
      return state.views.external.selectType;
    },
    getDialogExternalCard(state) {
      return state.views.external.dialogExternalCard;
    },
  },
  actions: {
    setUserLogged({ commit }) {
      commit("setUserLogged", new Token().jwtDecode());
    },
  },
});
