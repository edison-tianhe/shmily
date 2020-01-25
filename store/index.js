export const state = () => ({
  menuActiveName: 'home',
  articleLists: [],
  articlePage: 1,
  articleSize: 5,
  articleLoading: false,
  articleIsFinish: false
})

export const mutations = {
  setMenuName (state, val) {
    state.menuActiveName = val
  },
  setArticleLists (state, val) {
    state.articleLists = val
  },
  setArticlePage (state) {
    state.articlePage++
  },
  setArticleSize (state, val) {
    state.articleSize = val
  },
  setArticleLoading (state, val) {
    state.articleLoading = val
  },
  setArticleIsFinish (state, val) {
    state.articleIsFinish = val
  }
}
