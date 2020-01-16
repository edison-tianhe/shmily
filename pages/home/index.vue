<template>
  <div>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    首页{{ users[0].username }} <br>
    <Button>111</Button>
  </div>
</template>

<script>
export default {
  key (route) {
    return route.name
  },
  data () {
    return {
      users: []
    }
  },
  async asyncData ({ $axios }) {
    const res = await $axios.get('/users')
    if (res.code === 0) {
      return { users: res.data }
    } else {
      return { users: [] }
    }
  }
}
</script>

<style>
</style>
