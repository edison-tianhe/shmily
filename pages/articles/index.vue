<template>
  <div>
    <ArticlesCard
      v-for="item in articlesList"
      :key="item.id"
      :data="item"
      @click="$router.push({ name: 'articles-id', params: { id: $event.id } })"
    />
  </div>
</template>

<script>
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
  async asyncData ({ $axios }) {
    const res = await $axios.get('/articles')
    if (res.code === 0) {
      return { articlesList: res.data }
    } else {
      return { articlesList: [] }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
