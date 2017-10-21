export function addClass(el, className) {
  if (hasClassName(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

function hasClassName(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 获取dom元素上的属性和值
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}

// 创建一个元素，判断元素有无前缀属性，来确定浏览器环境
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    Moz: 'MozTransform',
    webkit: 'webkitTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

// 为不同浏览器加上不同属性前缀
export function prefixStyle(styleName) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return styleName
  }

  return vendor + styleName[0].toUpperCase() + styleName.substr(1)
}
