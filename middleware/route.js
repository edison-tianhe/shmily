/**
 * 重定向路由进入home页面
 *
 * @export
 * @param {*} { route, redirect }
 * @returns
 */
export default function ({ route, redirect, store }) {
  if (route.path === '/') {
    return redirect(`/home`)
  }
  store.commit('setMenuName', route.name)
}
