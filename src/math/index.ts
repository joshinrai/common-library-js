/**
 * 获取范围内的随机整数
 * min-最小数
 * max-最大数
 */
export function getRandomInt(min = 0, max = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 获取范围内的随机数
 * min-最小数
 * max-最大数
 */
export function getRandomNum(min = 0, max = 0) {
  if (max > min) {
    return Math.random() * (max - min) + min
  }
  return Math.random()
}

/**
 * 获取随机字符串可自定义需要的长度默认32
 * len-获取的长度
 */
export function getRandomStr(len = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxPos = chars.length
  let tmp = ''
  for (let i = 0; i < len; i++) {
    tmp += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return tmp
}
