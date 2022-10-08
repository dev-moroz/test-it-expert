import { createStore } from 'vuex'

export default createStore({
  state: {
    data: {},
    isLoading: false,
  },
  getters: {
    data: state => {
      return state.data.reduce((arr, item) => {
        if (arr.length === 0) arr.push(item)
        let lastItem = arr.length - 1
        if (arr[lastItem].userId === item.userId) {
          arr[lastItem].count += 1
          arr[lastItem].completed += item.completed
          if (arr[lastItem].title !== item.title) arr[lastItem].title += `, ${item.title}`
        } else {
          arr.push(item)
        }
        return arr
      }, [])
      .map( item => {
        item.title = item.title.split(",")
        return item
      })
      .sort((a, b) => {
        if (b.completed === a.completed) return b.id - a.id
        return b.completed - a.completed
      })
    },
    isLoading: state => state.isLoading,
    haveData: state => state.data.length > 0,
  },
  mutations: {
    setData(state, data) {
      state.data = data.map(item => {
        if (item.userId === 1) item.count = 0
        else item.count = 1
        return item
      })
    },
    changeIsLoading(state) {
      state.isLoading = !state.isLoading
    },
    cleanData(state) {
      state.data = {}
    }
  },
  actions: {
    getData({ commit, dispatch }) {
      commit("cleanData")
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then(res => res.json())
        .then(result => {
          commit("setData", result)
          dispatch("changeIsLoading")
        })
    },
    changeIsLoading({ commit }) {
      commit("changeIsLoading")
    },
  }
})
