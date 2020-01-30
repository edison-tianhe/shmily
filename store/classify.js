export const state = () => ({
  lists: [],
  page: 1,
  size: 5,
  loading: false,
  isFinish: false
})

export const mutations = {
  setLists (state, val) {
    state.lists = val
  },
  setPage (state) {
    state.page++
  },
  setSize (state, val) {
    state.size = val
  },
  setLoading (state, val) {
    state.loading = val
  },
  setIsFinish (state, val) {
    state.isFinish = val
  },
  init (state) {
    // *部分情况重置请求状态
    state.lists = []
    state.page = 1
    state.size = 5
    state.loading = false
    state.isFinish = false
  }
}
