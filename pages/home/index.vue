<template>
  <div>
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
      page: state => state.home.page,
      size: state => state.home.size,
      loading: state => state.home.loading,
      isFinish: state => state.home.isFinish
    })
  },
  async asyncData ({ $axios, store }) {
    const { lists, page, size } = store.state.home
    if (lists.length) {
      return { articlesList: [...lists] }
    }
    const res = await $axios.get(`/articles/0/${page}/${size}`)
    if (res.code === 0) {
      store.commit('home/setLists', [...res.data.data])
      store.commit('home/setPage')
      if (page * size >= res.data.total) {
        store.commit('home/setLoading', true)
        store.commit('home/setIsFinish', true)
      }
      return { articlesList: res.data.data }
    } else {
      return { articlesList: [] }
    }
  },
  methods: {
    articlesChange () {
      this.$store.commit('home/setLoading', true)
      this.$axios.get(`/articles/0/${this.page}/${this.size}`)
        .then((res) => {
          if (res.code === 0) {
            res.data.data.forEach((element) => {
              this.articlesList.push(element)
            })
            this.$store.commit('home/setLists', [...this.articlesList])
            if (res.data.page * res.data.size >= res.data.total) {
              this.$store.commit('home/setLoading', true)
              this.$store.commit('home/setIsFinish', true)
            } else {
              this.$store.commit('home/setLoading', false)
              this.$store.commit('home/setPage')
            }
          } else {
            this.$store.commit('home/setLoading', false)
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
