
import type { TypeNavigationSkeleton } from '$lib/clients/content_types.js'
import { content } from '$lib/clients/contentful'
// import UAParser from 'ua-parser-js'

export const load = async ({ request }) => {
  // let parser: UAParser = request.headers.has('User-Agent') && new UAParser(request.headers.get('User-Agent'))

  const [primaire, secondaire, tertiaire, footer] = await Promise.all([
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.liens'], include: 2, "fields.id": "primaire", locale: 'en-US' }),
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.liens'], include: 2, "fields.id": "secondaire", locale: 'en-US' }),
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.liens'], include: 2, "fields.id": "tertiaire", locale: 'en-US' }),
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.liens', 'fields.popup'], include: 4, "fields.id": "footer", locale: 'en-US' }),
  ])

  return {
    primaire: primaire.items[0],
    secondaire: secondaire.items[0],
    tertiaire: tertiaire.items[0],
    footer: footer.items[0],
    // device: parser?.getDevice().type || 'desktop'
  }
}