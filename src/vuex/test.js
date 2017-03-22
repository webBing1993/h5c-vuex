const store = new Vuex.Store({
  state: {
    count: []
  },
  mutations: {
    setcount (count) {
      state.count = count;
    }
  },
  actions: {
    setCount (context) {
      $http.get('../data.json').done(function(data){
        context.commit('setcount', data.count);
      })
    }
  }
})