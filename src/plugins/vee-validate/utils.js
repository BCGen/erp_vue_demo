export function strLen(str, size) {
  let len = 0

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    } else {
      len += size
    }
  }

  return Math.floor(len)
}
