<template>
  <Card>
    分类
  </Card>
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
  }
}
</script>

<style lang="less" scoped>
</style>
