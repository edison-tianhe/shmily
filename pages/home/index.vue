<template>
  <div>
    <ArticlesCard
      v-for="item in articlesList"
      :key="item.id"
      :data="item"
      @click="articleClick"
    />
    <div v-if="articleLoading && !articleIsFinish">
      <Spin>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load" />
        加载中...
      </Spin>
    </div>
    <div v-if="articleIsFinish">
      <Spin>
        没有更多啦~
      </Spin>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticlesCard from '@/components/articles-card'

export default {
  key (route) {
    return route.name
  },
  components: {
    ArticlesCard
  },
  data () {
    return {
      articlesList: []
    }
  },
  computed: {
    ...mapState(['articlePage', 'articleSize', 'articleLoading', 'articleIsFinish'])
  },
  async asyncData ({ $axios, store }) {
    const { articleLists, articlePage, articleSize } = store.state
    if (articleLists.length) {
      return { articlesList: [...articleLists] }
    }
    const res = await $axios.get(`/articles/${articlePage}/${articleSize}`)
    if (res.code === 0) {
      store.commit('setArticleLists', [...res.data.data])
      store.commit('setArticlePage')
      if (articlePage * articleSize >= res.data.total) {
        store.commit('setArticleLoading', true)
      }
      return { articlesList: res.data.data }
    } else {
      return { articlesList: [] }
    }
  },
  mounted () {
    document.addEventListener('scroll', (e) => {
      this.articlesChange(e)
    })
  },
  methods: {
    async articlesChange (e) {
      if (this.articleLoading) {
        return false
      }
      const _clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight
      const _scrollHeight = document.documentElement
        ? document.documentElement.scrollHeight
        : document.body.scrollHeight
      const _scrollTop = document.documentElement
        ? document.documentElement.scrollTop
        : document.body.scrollTop
      if (_clientHeight + _scrollTop - 100 >= _scrollHeight - 101) {
        this.$store.commit('setArticleLoading', true)
        const res = await this.$axios.get(`/articles/${this.articlePage}/${this.articleSize}`)
        if (res.code === 0) {
          res.data.data.forEach((element) => {
            this.articlesList.push(element)
          })
          this.$store.commit('setArticleLists', [...this.articlesList])
          if (res.data.page * res.data.size >= res.data.total) {
            this.$store.commit('setArticleLoading', true)
            this.$store.commit('setArticleIsFinish', true)
          } else {
            this.$store.commit('setArticleLoading', false)
            this.$store.commit('setArticlePage')
          }
        } else {
          this.$store.commit('setArticleLoading', false)
          this.$Notice.warning({
            title: '请求失败',
            desc: '文章列表请求失败,请重试'
          })
        }
      }
    },
    articleClick (data) {
      this.$router.push({ name: 'articles-id', params: { id: data.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>
