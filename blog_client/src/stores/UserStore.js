import { defineStore } from "pinia"; // 引入pinia

export const UserStore = defineStore("admin", {
  state: () => {
    return {
      token: "",
      logined: false,
      user: {
        id: '',
        avatar: '',
        role: 0,
      }
    };
  },
  actions: {
    setLogined(val){
      this.logined = !!val
    },
    setUser(user) {
      this.user = user
    }
  },
  getters: {
    hasLogin(state) {
      return state.logined
    },
    userInfo(state){
      return state.user
    },
    isTeacher(state){
      return state.user.role == 1
    }
  },
});