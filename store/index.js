export const state = () => ({
  menuActiveName: 'home',
  categorys: {}
})

export const mutations = {
  setMenuName (state, val) {
    state.menuActiveName = val
  },
  setCategorys (state, val) {
    state.categorys = val
  }
}

export const actions = {
  // 全局服务初始化
  async nuxtServerInit ({ commit }, { $axios }) {
    const res = await $axios.get(`/findCategorys`)
    const _res = {}
    if (res.code === 0) {
      res.data.map((item) => {
        _res[item.id] = item.label
      })
      commit('setCategorys', _res)
    }
  }
}
