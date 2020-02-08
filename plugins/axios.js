export default function ({ $axios, redirect }) {
  $axios.defaults.baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://47.95.242.44:3000/'
  $axios.onRequest((config) => {
    // *IE浏览器数据请求缓存问题
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000
      }
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config
  })

  $axios.onResponse((res) => {
    return res.data
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
