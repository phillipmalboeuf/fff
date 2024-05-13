import contentful from 'contentful'

const preview = !!import.meta.env.VITE_PREVIEW
export const content = contentful.createClient({
  space: '4uoaac9p65k1',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'YfiOIXK19YSSFot_gO2tyn9vRl7JqzOrzSeOBhduN54' : '1_qKiUeruQxfKHYFc5jB5I_zzT_7lxrwyCuu5j1vXcQ',
}).withoutUnresolvableLinks