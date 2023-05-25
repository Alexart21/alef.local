export default {
	namespaced: true,
    state: {
        data: null,
      },
      getters: {

      },
      mutations: {
        setData(state, payload) {
          state.data = payload;
          // console.log(state.data);
        },
      },
      actions: {
        setUserData({ commit }, payload){
          commit('setData', payload)
        }
      },
}
