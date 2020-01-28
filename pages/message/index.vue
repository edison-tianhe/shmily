<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-outlet-outline" />
        主人寄语
      </p>
      <p>第一次写...</p>
      <p>网站上的图片好多都不知道什么时候保存的,也不知道作者是谁.</p>
      <p>如果侵权了记得联系我及时更正</p>
    </Card>
    <Card>
      <CommentBox ref="comment" @on-submit="messageSubmit" />
    </Card>
    <Card>
      <ArticlesComment
        v-for="item in messageList"
        :key="item.id"
        :data="item"
        @on-reply="replySubmit($event, item)"
        @on-again-reply="replySubmit"
      />
      <Page :current="messagePage" :total="messageTotal" @on-change="getMessage" simple />
    </Card>
  </div>
</template>

<script>
import CommentBox from '@/components/comment-box'
import ArticlesComment from '@/components/articles-comment'
import { dateFormat } from '@/plugins/utils'

export default {
  key (route) {
    return route.name
  },
  components: {
    CommentBox,
    ArticlesComment
  },
  data () {
    return {
      messageList: [],
      messagePage: 1,
      messageSize: 10,
      messageTotal: 10
    }
  },
  async asyncData ({ $axios, params }) {
    const res = await $axios.get(`/meaasge/list/1/10`)
    if (res.code === 0) {
      return {
        messageList: res.data.data,
        messageTotal: res.data.total
      }
    } else {
      return { messageList: [] }
    }
  },
  methods: {
    replySubmit (data, item) {
      this.$axios.put(`/meaasge/reply`, {
        ...data,
        replyer: item.name,
        id: item.id,
        createtime: dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
      })
        .then((res) => {
          if (res.code !== 0) {
            this.$Notice.warning({
              title: '请求失败',
              desc: '回复留言失败'
            })
          }
          this.$Notice.success({
            title: '请求成功',
            desc: '回复留言成功'
          })
          this.$set(item, '$reply', false)
          this.getMessage()
        })
    },
    messageSubmit (data) {
      this.$axios.post(`/meaasge/comment`, {
        ...data
      })
        .then((res) => {
          if (res.code !== 0) {
            this.$Notice.warning({
              title: '请求失败',
              desc: '留言失败'
            })
            return new Error()
          }
          this.$Notice.success({
            title: '请求成功',
            desc: '留言成功'
          })
          this.$refs.comment.init()
          this.getMessage()
        })
    },
    getMessage (page = this.messagePage) {
      this.$axios.get(`/meaasge/list/${page}/${this.messageSize}`)
        .then((res) => {
          if (res.code !== 0) {
            this.$Notice.warning({
              title: '请求失败',
              desc: '评论列表请求失败'
            })
            return false
          }
          this.messageList = res.data.data
          this.messageTotal = res.data.total
          this.messagePage = res.data.page
        })
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-card {
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, .8);
}
&:last-child {
  margin-bottom: 0;
}
.ivu-page {
  margin: 0;
  text-align: center;
}
</style>
