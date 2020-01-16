<template>
  <div class="layout">
    <Layout>
      <Sider :collapsed-width="78" v-model="isCollapsed" collapsible>
        <img :class="menuAvatorClasses" src="@/static/avator.png" alt="">
        <p :class="menuTalkClasses" v-for="(item, index) in talks" :key="index">
          {{ item }}
        </p>
        <Menu :class="menuItemClasses" :active-name="activeName" theme="dark" width="auto">
          <MenuItem v-for="item in menuList" :key="item.name" :to="{ name: item.name}" :name="item.name">
            <Icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <nuxt />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import './scrollBar.less'

export default {
  head () {
    return {
      title: this.title
    }
  },
  data () {
    return {
      activeName: 'home',
      isCollapsed: true,
      talks: [
        '没办法',
        '是这样的',
        '当然我只是建议'
      ],
      menuList: [
        { title: '首页', icon: 'ios-planet', name: 'home' },
        { title: '文章', icon: 'ios-laptop', name: 'articles' },
        { title: '留言板', icon: 'ios-leaf', name: 'message' }
      ],
      title: `(〃'▽'〃) 经验 + 5`
    }
  },
  computed: {
    menuAvatorClasses () {
      return ['menu-avator', this.isCollapsed ? 'collapsed-menu-avator' : '']
    },
    menuTalkClasses () {
      return ['menu-talk', this.isCollapsed ? 'collapsed-menu-talk' : '']
    },
    menuItemClasses () {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  mounted () {
    document.addEventListener('visibilitychange', () => {
      this.title = !document.hidden
        ? 'ヾ(Ő∀Ő๑)ﾉ - 你回来啦~'
        : '(。＿ 。) - 你什么时候回来呢~'
    })
    this.isCollapsed = document.documentElement.clientWidth < 1000
    window.addEventListener('resize', () => {
      this.isCollapsed = document.documentElement.clientWidth < 1000
    })
  }
}
</script>

<style lang="less" scoped>
.ivu-layout {
  height: 100vh;
  .menu-avator {
    display: block;
    width: 100%;
    border-radius: 50%;
    padding: 20px;
  }
  .collapsed-menu-avator {
    padding: 10px;
  }
  .menu-talk {
    width: 100%;
    text-align: center;
    color: #fff;
    margin: 5px 0;
  }
  .collapsed-menu-talk {
    display: none;
  }
  .ivu-layout-header {
    background: #fff;
    box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
  }
  .ivu-layout-content {
    padding: 16px;
    background: url('~@/static/bg.jpg') no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    color: #fff;
  }
}
.menu-item {
  span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
}
.collapsed-menu {
  span {
    display: none;
    width: 0px;
    transition: width 0.2s ease;
  }
  i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
}
</style>
