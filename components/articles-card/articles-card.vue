<template>
  <Card @click.native="$emit('click', data)">
    <div class="layer">
      <h1>{{ data.title }}</h1>
      <p>{{ data.intro }}</p>
      <div>
        <span>
          <Icon type="ios-time-outline" />
          {{ data.createtime }}
        </span>
        <span>
          <Icon type="ios-chatbubbles-outline" />
          {{ data.comment || 0 }}
        </span>
        <span>
          <Icon type="ios-locate-outline" />
          {{ data.visit || 0 }}
        </span>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-card {
  height: 200px;
  text-align: center;
  border: 0;
  background: url('https://random.52ecy.cn/randbg.php') no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  cursor: pointer;
  /deep/ .ivu-card-body {
    padding: 0;
  }
}
.layer {
  width: 100%;
  height: 200px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    h1 {
      line-height: 100px;
    }
  }
  h1 {
    font-weight: 400;
    line-height: 200px;
    transition: all 0.3s;
  }
  p {
    line-height: 49px;
    border-bottom: 1px solid #848484;
  }
  div {
    line-height: 50px;
    span {
      margin-right: 10px;
    }
    span:last-child {
      margin-right: 0;
    }
  }
}
</style>
