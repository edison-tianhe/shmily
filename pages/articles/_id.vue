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
        {{ articlesDetails.categoryLabel || '无标签' }}
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
      <Form
        ref="formValidate"
        :model="commentForm"
        :label-colon="true"
        :rules="ruleValidate"
        label-position="top"
        class="commentForm"
      >
        <FormItem label="昵称" prop="name">
          <Input v-model="commentForm.name" />
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="commentForm.email" />
        </FormItem>
        <FormItem label="博客">
          <Input v-model="commentForm.blog" />
        </FormItem>
      </Form>
      <div class="comment-editor">
        <Input
          v-model="comment"
          :autosize="{minRows: 5,maxRows: 10}"
          type="textarea"
          placeholder="不来互动一波吗..."
        />
        <Button @click="handleSubmit('formValidate')" type="success">
          发表评论
        </Button>
        <Checkbox v-model="privacy">
          私密评论
        </Checkbox>
      </div>
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
      articlesDetails: {},
      comment: '',
      privacy: false,
      commentForm: {
        name: '',
        email: '',
        blog: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入自己的昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入自己的邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ]
      }
    }
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
    this.findCategorys()
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    reward () {
      this.$Notice.info({
        title: '感谢大佬',
        desc: '不过打赏还是算了吧,相互学习'
      })
    },
    findCategorys () {
      this.$axios.get(`/findCategorys`)
        .then((res) => {
          if (res.code !== 0) {
            this.$Notice.warning({
              title: '请求失败',
              desc: '分类请求失败'
            })
            return false
          }
          const categorys = res.data.filter((v) => {
            return v.id === this.articlesDetails.category
          })
          this.$set(this.articlesDetails, 'categoryLabel', categorys[0].label)
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
@media screen and (max-width: 1000px) {
  .commentForm > div {
    width: 100%!important;
  }
}
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
  .commentForm {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > div {
      width: 32%;
    }
  }
  .comment-editor {
    background-color: #fff;
    overflow: hidden;
    label, button {
      float: right;
      margin: 10px;
    }
  }
}
</style>
