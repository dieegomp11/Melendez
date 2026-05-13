// eslint-disable-next-line no-unused-vars
export default function customLoader({ src, width, quality }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${base}${src}`
}
