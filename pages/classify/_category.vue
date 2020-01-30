<template>
  <div>
    <Affix style="margin-bottom: 20px">
      <Card>
        <span>当前分类：{{ categorys[$route.params.category] }}</span>
      </Card>
    </Affix>
    <ArticlesCard
      :list="articlesList"
      :loading="loading"
      :finish="isFinish"
      @click="articleClick"
      @on-load="articlesChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticlesCard from '@/components/articles-card'

export default {
  validate ({ params }) {
    if (params.category) {
      return true
    } else {
      return false
    }
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
    ...mapState({
      page: state => state.classify.page,
      size: state => state.classify.size,
      loading: state => state.classify.loading,
      isFinish: state => state.classify.isFinish,
      categorys: state => state.categorys
    })
  },
  async asyncData ({ $axios, store, params }) {
    const { lists, page, size } = store.state.classify
    if (lists.length) {
      return { articlesList: [...lists] }
    }
    const res = await $axios.get(`/articles/${params.category ? params.category : 0}/${page}/${size}`)
    if (res.code === 0) {
      store.commit('classify/setLists', [...res.data.data])
      store.commit('classify/setPage')
      if (page * size >= res.data.total) {
        store.commit('classify/setLoading', true)
        store.commit('classify/setIsFinish', true)
      }
      return { articlesList: res.data.data }
    } else {
      return { articlesList: [] }
    }
  },
  methods: {
    articlesChange () {
      this.$store.commit('classify/setLoading', true)
      this.$axios.get(`/articles/${this.$route.params.category ? this.$route.params.category : 0}/${this.page}/${this.size}`)
        .then((res) => {
          if (res.code === 0) {
            res.data.data.forEach((element) => {
              this.articlesList.push(element)
            })
            this.$store.commit('classify/setLists', [...this.articlesList])
            if (res.data.page * res.data.size >= res.data.total) {
              this.$store.commit('classify/setLoading', true)
              this.$store.commit('classify/setIsFinish', true)
            } else {
              this.$store.commit('classify/setLoading', false)
              this.$store.commit('classify/setPage')
            }
          } else {
            this.$store.commit('classify/setLoading', false)
            this.$Notice.warning({
              title: '请求失败',
              desc: '文章列表请求失败,请重试'
            })
          }
        })
    },
    articleClick (data) {
      this.$router.push({ name: 'articles-id', params: { id: data.id } })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
