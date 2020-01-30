<template>
  <div class="articles">
    <h1 class="articles-title">
      {{ articlesDetails.title }}
    </h1>
    <div class="articles-title-u">
      <span>
        <Icon type="ios-time-outline" />
        {{ articlesDetails.createtime }}
      </span>
      <span>
        <Icon type="ios-chatbubbles-outline" />
        {{ articlesDetails.comment || 0 }}
      </span>
      <span>
        <Icon type="ios-locate-outline" />
        {{ articlesDetails.preview || 0 }}
      </span>
      <span>
        <Icon type="ios-pricetags-outline" />
        {{
          categorys[articlesDetails.category]
            ? categorys[articlesDetails.category]
            : '无标签'
        }}
      </span>
    </div>
    <Card class="articles-box">
      <div v-html="articlesDetails.contentHTML" />
      <span class="articles-footer articles-footer-l">
        <Icon type="md-create" />
        Last Time: {{ articlesDetails.updatetime }}
      </span>
      <span class="articles-footer articles-footer-r">
        © 著作权归作者所有
      </span>
    </Card>
    <Card class="articles-box" style="text-align: center">
      <div>
        <Button @click="reward" icon="ios-beer-outline" type="error" shape="circle" style="margin: 20px 0;">
          赞 赏
        </Button>
        <p>如果觉得我的文章对你有用，请随意赞赏</p>
      </div>
    </Card>
    <Card class="articles-box">
      <p slot="title">
        <Icon type="ios-chatboxes-outline" />
        申请互动
      </p>
      <CommentBox ref="comment" @on-submit="commentSubmit" />
      <div class="comment-list">
        <h6 class="comment-list-h">
          已有评论
        </h6>
        <ArticlesComment
          v-for="item in commentList"
          :key="item.id"
          :data="item"
          @on-reply="replySubmit($event, item)"
          @on-again-reply="replySubmit"
        />
        <p v-if="commentList.length === 0" style="margin-bottom: 10px">
          暂时还么得评论呀~
        </p>
        <Page :current="commentPage" :total="commentTotal" @on-change="getComment" simple />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticlesComment from '@/components/articles-comment'
import CommentBox from '@/components/comment-box'
import { dateFormat } from '@/plugins/utils'

export default {
  validate ({ params }) {
    if (params.id) {
      return true
    } else {
      return false
    }
  },
  components: {
    ArticlesComment,
    CommentBox
  },
  data () {
    return {
      articlesDetails: {},
      commentPage: 1,
      commentSize: 10,
      commentTotal: 10,
      commentList: []
    }
  },
  computed: {
    ...mapState(['categorys'])
  },
  async asyncData ({ $axios, params }) {
    const res = await $axios.get(`/articles/${params.id}`)
    if (res.code === 0) {
      return { articlesDetails: res.data }
    } else {
      return { articlesDetails: {} }
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    replySubmit (data, item) {
      this.$axios.put(`/articles/reply`, {
        ...data,
        replyer: item.name,
        articleId: this.$route.params.id,
        id: item.id,
        createtime: dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
      })
        .then((res) => {
          if (res.code !== 0) {
            this.$Notice.warning({
              title: '请求失败',
              desc: '回复评论失败'
            })
          }
          this.$Notice.success({
            title: '请求成功',
            desc: '回复评论成功'
          })
          this.$set(item, '$reply', false)
          this.getComment()
        })
    },
    commentSubmit (data) {
      this.$axios.post(`/articles/comment`, {
        ...data,
        articleId: this.$route.params.id
      })
        .then((res) => {
          if (res.code !== 0) {
            this.$Notice.warning({
              title: '请求失败',
              desc: '评论失败'
            })
          }
          this.$Notice.success({
            title: '请求成功',
            desc: '评论成功'
          })
          this.$refs.comment.init()
          this.getComment()
        })
    },
    reward () {
      this.$Notice.info({
        title: '感谢大佬',
        desc: '不过打赏还是算了吧,相互学习'
      })
    },
    getComment (page = this.commentPage) {
      this.$axios.get(`/articles/comment/${this.$route.params.id}/${page}/${this.commentSize}`)
        .then((res) => {
          if (res.code !== 0) {
            this.$Notice.warning({
              title: '请求失败',
              desc: '评论列表请求失败'
            })
            return false
          }
          this.commentList = res.data.data
          this.commentTotal = res.data.total
          this.commentPage = res.data.page
        })
    }
  }
}
</script>

<style scoped>
.articles-box >>> img {
  max-width: 100%;
}
.articles-box >>> ul,
.articles-box >>> ol,
.articles-box >>> dl {
  margin-left: 16px;
}
</style>

<style lang="less" scoped>
.articles {
  text-align: center;
  .articles-title {
    color: #fff;
    margin: 20px 0;
  }
  .articles-title-u {
    color: #fff;
    font-size: 12px;
    margin-bottom: 20px;
    span {
      margin: 0 10px;
    }
  }
  .articles-box {
    text-align: left;
    background-color: rgba(255, 255, 255, .8);
    margin-bottom: 20px;
    overflow: hidden;
    .articles-footer {
      margin: 50px 0 20px;
      font-size: 12px;
      color: #9d9d9d;
    }
    .articles-footer-l {
      float: left;
    }
    .articles-footer-r {
      float: right;
    }
  }
  .comment-list {
    &-h {
      font-size: 18px;
      font-weight: 500;
      margin: 20px 0;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .ivu-page {
      margin: 0;
      text-align: center;
    }
  }
}
</style>
