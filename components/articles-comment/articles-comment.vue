<template>
  <div class="comment-box">
    <div class="comment-box-l">
      <img :src="avator" :alt="data.name">
    </div>
    <div class="comment-box-r">
      <h6>{{ data.name }}</h6>
      <p class="comment-box-r-time">
        {{ data.createtime }}
        <Button @click="$set(data, '$reply', true)" size="small" type="primary">
          回复
        </Button>
      </p>
      <p v-if="!data.privacy" class="comment-box-r-comment">
        <span v-if="data.replyer" class="replyer">@{{ data.replyer }}</span> {{ data.comment }}
      </p>
      <p v-else class="comment-box-r-comment" style="color: #f36">
        这是一条私密评论
      </p>
      <transition name="fade">
        <div v-show="data.$reply" class="reply-box">
          <CommentBox :on-submit="replySubmit">
            <Button @click="data.$reply = false" type="primary">
              取消回复
            </Button>
          </CommentBox>
        </div>
      </transition>
      <ArticleComment v-for="(item, index) in data.replyList" :key="index+'-reply'" :data="item" @on-reply="$emit('on-reply')" />
    </div>
  </div>
</template>

<script>
import CommentBox from '@/components/comment-box'
import { dateFormat } from '@/plugins/utils'

export default {
  name: 'ArticleComment',
  components: {
    CommentBox
  },
  props: {
    data: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  computed: {
    avator () {
      return `${location.protocol}//q4.qlogo.cn/g?b=qq&nk=${this.data.email.split('@')[0]}&s=5`
    }
  },
  methods: {
    replySubmit (data) {
      return new Promise((resolve, reject) => {
        this.$axios.put(`/articles/reply`, {
          ...data,
          replyer: this.data.name,
          articleId: this.$route.params.id,
          id: this.data.id,
          createtime: dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
        })
          .then((res) => {
            if (res.code !== 0) {
              this.$Notice.warning({
                title: '请求失败',
                desc: '回复评论失败'
              })
              return new Error()
            }
            this.$Notice.success({
              title: '请求成功',
              desc: '回复评论成功'
            })
            this.data.$reply = false
            this.$emit('on-reply')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comment-box {
  position: relative;
  margin-bottom: 20px;
  &-l {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  &-r {
    margin-left: 70px;
    border-bottom: 1px solid #cccccc;
    h6 {
      font-size: 15px;
      margin-bottom: 5px;
    }
    &-time {
      font-size: 12px;
      color: #919191;
      margin-bottom: 5px;
      button {
        margin-left: 20px;
        font-size: 12px;
      }
    }
    &-comment {
      margin-bottom: 10px;
      .replyer {
        color: #239aff;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
.reply-box {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
