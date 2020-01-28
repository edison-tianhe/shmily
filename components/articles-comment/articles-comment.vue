<template>
  <div class="comment-box">
    <div class="comment-box-l">
      <img :src="avator" :alt="data.name">
    </div>
    <div class="comment-box-r">
      <h6>
        {{ data.name }}
        <span v-if="data.browseN" :style="{backgroundImage: 'url(' + require(`@/assets/browse/${data.browseN.toLowerCase()}.png`) + ')'}">
          {{ data.browseN }} / {{ data.browseV }}
        </span>
      </h6>
      <p v-if="!data.privacy" class="comment-box-r-comment">
        <span v-if="data.replyer" class="replyer">@{{ data.replyer }}</span> {{ data.comment }}
      </p>
      <p v-else class="comment-box-r-comment" style="color: #f36">
        这是一条私密评论
      </p>
      <p class="comment-box-r-time">
        {{ data.createtime }}
        <Button @click="$set(data, '$reply', true)" size="small">
          回复
        </Button>
      </p>
      <transition name="fade">
        <div v-show="data.$reply" class="reply-box">
          <CommentBox @on-submit="$emit('on-reply', $event)">
            <Button @click="data.$reply = false" type="primary">
              取消回复
            </Button>
          </CommentBox>
        </div>
      </transition>
      <ArticleComment
        v-for="(item, index) in data.replyList"
        :key="index+'-reply'"
        :data="item"
        @on-reply="$emit('on-again-reply', $event, item)"
      />
    </div>
  </div>
</template>

<script>
import CommentBox from '@/components/comment-box'

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
      return `https://q4.qlogo.cn/g?b=qq&nk=${this.data.email.split('@')[0]}&s=5`
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
    // border-bottom: 1px solid #cccccc;
    h6 {
      font-size: 15px;
      line-height: 30px;
      span {
        opacity: 0;
        font-size: 12px;
        line-height: 15px;
        background-repeat: no-repeat;
        background-size: 13px 13px;
        background-color: #ff8383;
        background-position: 5px 5px;
        color: #fff;
        padding: 5px;
        padding-left: 23px;
        border-radius: 5px;
        transition: all .3s;
      }
    }
    &-time {
      font-size: 12px;
      color: #919191;
      margin-bottom: 5px;
      button {
        margin-left: 20px;
        font-size: 12px;
        color: #239aff;
        background-color: transparent;
        border-color: #239aff;
      }
    }
    &-comment {
      margin: 10px 0;
      .replyer {
        color: #239aff;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
.comment-box:hover {
  h6 {
    span {
      opacity: 1;
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
