export const exportJson = (el, uidl) => {
  const data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(uidl))

  el.setAttribute('href', 'data:' + data)
  el.setAttribute('download', 'uidl.json')
}

export const slugify = (str: string): string => {
  if (str == null) {
    return null // Check for undefined or null
  }

  return str
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    .replace(/&/g, '-and-') // Replace & with 'and'
}

export const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1)
