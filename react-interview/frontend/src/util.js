export default function humanReadable(str) {
  return str.toLowerCase()
  .replace(/_/g, ' ')
  .replace(/(?: |\b)(\w)/g, function(key, p1) {
    return key.toUpperCase();
  })
}