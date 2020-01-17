<template>
  <div>
    <Card v-for="item in articlesList" :key="item.id" @click.native="$router.push({ name: 'articles-id', params: { id: item.id } })">
      {{ item.title }}
    </Card>
  </div>
</template>

<script>
export default {
  key (route) {
    return route.name
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
.ivu-card {
  cursor: pointer;
}
</style>
