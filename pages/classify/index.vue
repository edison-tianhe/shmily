<template>
  <div class="classify">
    <HoverBox
      v-for="(item, index) in categorys"
      :key="item.id"
      :data="item"
      :index="index"
      @click="clickChange(item)"
      class="hover"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HoverBox from '@/components/hover-box'

export default {
  components: {
    HoverBox
  },
  computed: {
    ...mapState({
      categorys: (state) => {
        const res = []
        for (const key in state.categorys) {
          if (state.categorys.hasOwnProperty(key)) {
            const element = state.categorys[key]
            res.push({
              id: key,
              label: element
            })
          }
        }
        return res
      }
    })
  },
  methods: {
    clickChange (item) {
      this.$store.commit('classify/init')
      this.$router.push({ name: 'classify-category', params: { category: item.id } })
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 700px) {
  .classify>div {
    width: 100%!important;
    margin: 0 0 30px!important;
  }
}
.classify {
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 27.3%;
    margin: 0 3% 30px;
  }
}
</style>
