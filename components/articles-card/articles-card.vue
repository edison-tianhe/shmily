<template>
  <div>
    <ArticlesCardChildren
      v-for="item in list"
      :key="item.name"
      :data="item"
      @click="articleClick"
    />
    <div v-if="loading && !finish">
      <Spin>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load" />
        加载中...
      </Spin>
    </div>
    <div v-if="finish">
      <Spin>
        没有更多啦~
      </Spin>
    </div>
  </div>
</template>

<script>
import ArticlesCardChildren from './articles-card-children'

export default {
  name: 'ArticlesCard',
  components: {
    ArticlesCardChildren
  },
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    loading: {
      type: Boolean,
      required: true,
      default: () => false
    },
    finish: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  mounted () {
    document.addEventListener('scroll', this.articlesChange)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.articlesChange)
  },
  methods: {
    articlesChange () {
      if (this.finish) {
        document.removeEventListener('scroll', this.articlesChange)
        return false
      }
      if (this.loading) {
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
        this.$emit('on-load')
      }
    },
    articleClick (data) {
      this.$emit('click', data)
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
