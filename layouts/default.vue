<template>
  <div class="layout">
    <Layout>
      <Sider :collapsed-width="78" v-model="isCollapsed" collapsible>
        <div :class="menuAvatorClasses">
          <img src="@/static/avator.png" alt="">
        </div>
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
          <div class="content-card">
            <nuxt />
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import './default.less'
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
