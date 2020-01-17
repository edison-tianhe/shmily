<template>
  <div>
    <Card class="articles-box">
      <div v-html="articlesDetails.contentHTML" />
    </Card>
  </div>
</template>

<script>
export default {
  key (route) {
    return route.name
  },
  validate ({ params }) {
    if (params.id) {
      return true
    } else {
      return false
    }
  },
  data () {
    return {
      articlesDetails: {}
    }
  },
  async asyncData ({ $axios, params }) {
    const res = await $axios.get(`/articles/${params.id}`)
    if (res.code === 0) {
      return { articlesDetails: res.data }
    } else {
      return { articlesDetails: {} }
    }
  }
}
</script>

<style scoped>
.articles-box >>> img {
  /* width: 100%; */
}
</style>
