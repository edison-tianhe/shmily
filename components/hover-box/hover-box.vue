<template>
  <div @click="$emit('click', data)" class="hover-box">
    <div class="bg-img">
      <img :src="require(`@/assets/category/S_${Math.ceil(Math.random()*208)}.png`) ">
    </div>
    <div class="triangle-l" />
    <div class="triangle-r" />
    <div class="info">
      {{ data.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    },
    index: {
      type: Number,
      required: true,
      default: () => 1
    }
  }
}
</script>

<style lang="less" scoped>
.hover-box {
  display: inline-block;
  width: 100%;
  height: calc(100vh - 32px);
  border: 1px solid #fff;
  border-top: 5px solid #fff;
  border-bottom: 5px solid #fff;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  transform: rotate(3deg);
  .bg-img {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    transition: all .3s;
    img {
      position: absolute;
      left: 50%;
      height: 100%;
      transform: translate(-50%, 0);
    }
  }
  .triangle-l, .triangle-r {
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: all .3s;
    transform: rotate(45deg);
    transition: .3s all;
  }
  .triangle-l {
    top: -30%;
    left: -50%;
  }
  .triangle-r {
    bottom: -30%;
    right: -50%;
  }
  .info {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s all .3s;
  }
  &:hover {
    .triangle-l, .triangle-r {
      width: 200%;
    }
    .info {
      opacity: 1;
    }
    .bg-img {
      transform: scale(1.2);
    }
  }
}
.hover-box::before {
  display: block;
  content: '';
  position: absolute;
  top: 0px;
  right: -2px;
  width: 30%;
  height: 5px;
  border-bottom-left-radius: 20px;
  background-color: #fff;
  z-index: 100;
}
.hover-box::after {
  display: block;
  content: '';
  position: absolute;
  bottom: 0px;
  left: -2px;
  width: 30%;
  height: 5px;
  border-top-right-radius: 20px;
  background-color: #fff;
  z-index: 100;
}
</style>
