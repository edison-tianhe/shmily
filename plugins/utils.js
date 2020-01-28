export function dateFormat (fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(),
    'm+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'M+': date.getMinutes().toString(),
    'S+': date.getSeconds().toString()
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

export function getBrowserInfo () {
  let explorer = navigator.userAgent
  explorer = explorer.toLowerCase()
  if (explorer.match(/msie/) != null || explorer.match(/trident/) != null) {
    // ie
    const ver = explorer.match(/msie ([\d.]+)/) != null ? explorer.match(/msie ([\d.]+)/)[1] : explorer.match(/rv:([\d.]+)/)[1]
    return { name: 'IE', version: ver }
  }
  if (explorer.match(/firefox/) != null) {
    // firefox
    const ver = explorer.match(/firefox\/([\d.]+)/)[1] || ''
    return { name: 'Firefox', version: ver }
  }
  if (explorer.match(/opera/) != null) {
    // opera
    const ver = explorer.match(/opera.([\d.]+)/)[1] || ''
    return { name: 'Opera', version: ver }
  }
  if (explorer.match(/edge/) != null) {
    // edge
    const ver = explorer.match(/edge\/([\d.]+)/)[1] || ''
    return { name: 'Edge', version: ver }
  }
  if (explorer.match(/maxthon/) != null) {
    // maxthon
    const ver = explorer.match(/maxthon\/([\d.]+)/)[1] || ''
    return { name: 'Maxthon', version: ver }
  }
  if (explorer.match(/UCBrowser/) != null) {
    // uc
    const ver = explorer.match(/maxthon\/([\d.]+)/)[1] || ''
    return { name: 'Uc', version: ver }
  }
  if (explorer.match(/qqbrowse/) != null) {
    // qqbrowse
    const ver = explorer.match(/qqbrowser\/([\d.]+)/)[1] || ''
    return { name: 'QQ', version: ver }
  }
  if (explorer.match(/se 2.x/) != null) {
    // sougou
    return { name: '搜狗', version: '' }
  }
  if (explorer.match(/chrome/) != null) {
    // chrome / 360
    const is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
    const ver = explorer.match(/chrome\/([\d.]+)/)[1] || ''
    if (is360) {
      return { name: '360', version: ver }
    } else {
      return { name: 'Chrome', version: ver }
    }
  }
  if (explorer.match(/safari/) != null) {
    // safari
    const ver = explorer.match(/version\/([\d.]+)/)[1] || ''
    return { name: 'Safari', version: ver }
  }
  return { name: '', version: '' }
}

function _mime (option, value) {
  const mimeTypes = navigator.mimeTypes
  for (const mt in mimeTypes) {
    if (mimeTypes[mt][option] === value) {
      return true
    }
  }
  return false
}
