<template>
  <div>
    <Form
      ref="formValidate"
      :model="commentForm"
      :label-colon="true"
      :rules="ruleValidate"
      label-position="top"
      class="commentForm"
    >
      <FormItem label="昵称" prop="name">
        <Input v-model="commentForm.name" placeholder="昵称" />
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="commentForm.email" placeholder="邮箱(真实邮箱)" />
      </FormItem>
      <FormItem label="博客">
        <Input v-model="commentForm.blog" placeholder="非必填" />
      </FormItem>
    </Form>
    <div class="comment-editor">
      <Input
        v-model="commentForm.comment"
        :autosize="{minRows: 5,maxRows: 10}"
        type="textarea"
        placeholder="不来互动一波吗..."
      />
      <Button @click="openEmoticon" class="comment-editor-emoticon">
        表情包
      </Button>
      <Button @click="handleSubmit('formValidate')" type="success">
        发表评论
      </Button>
      <slot />
      <!-- <Checkbox v-model="commentForm.privacy">
          私密评论
      </Checkbox>-->
    </div>
  </div>
</template>

<script>
const initCommentForm = {
  name: '',
  email: '',
  blog: '',
  comment: '',
  privacy: false
}

export default {
  data () {
    return {
      commentForm: { ...initCommentForm },
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
  methods: {
    init () {
      this.commentForm = { ...initCommentForm }
    },
    handleSubmit (name) {
      if (!this.commentForm.comment) {
        this.$Notice.error({
          title: '提示',
          desc: '还没有填写评论呐'
        })
        return false
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('on-submit', this.commentForm)
        } else {
          this.$Notice.error({
            title: '提示',
            desc: '信息还没有填写完整哦'
          })
        }
      })
    },
    openEmoticon () {
      this.$Notice.error({
        title: '打开失败',
        desc: '数据请求失败（其实我还没写表情这块。。。）'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 1000px) {
  .commentForm > div {
    width: 100% !important;
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
  &-emoticon{
    float: left!important;
    background: url('~@/assets/emoticon/image_emoticon25.png') no-repeat;
    background-position: 10% center;
    background-size: 20px;
    padding-left: 30px;
  }
  label, button {
    float: right;
    margin: 10px;
  }
}
</style>
