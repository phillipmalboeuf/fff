import type { Entry } from 'contentful'
import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { error } from '@sveltejs/kit'

export const load = (async ({ locals, url, params }) => {
  
  const [pages] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.id": "accueil" }),
  ])

  if (!pages?.items.length) {
    error(404, 'Not Found')
  }

  return {
    page: pages.items[0]
  }
})