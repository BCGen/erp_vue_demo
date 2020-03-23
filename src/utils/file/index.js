import { saveAs } from 'file-saver'

/**
 * 轉換成 pdf
 */
export function toPdf(file) {
  var blob = new Blob([file], { type: 'application/pdf' })

  let objectUrl = URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.href = objectUrl
  link.setAttribute('target', '_blank')
  document.body.appendChild(link)
  link.click()
}

export function toZip(file, fileName) {
  var blob = new Blob([file])
  saveAs(blob, fileName)
}

export function toExcel(file, fileName) {
  var blob = new Blob([file])
  saveAs(blob, fileName)
}
