// import type { TypePageSkeleton, TypeCollectionSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'
// import { content } from '$lib/clients/contentful'
// import type { Entry } from 'contentful'

import { square } from '$lib/clients/square'
import type { Point } from '../+page.server.js'

export type Option = {
  titre?: string
  option: string
  prix?: number
}

export type Format = {
  titre?: string
  format: string
  prix: number
}

export type Saison = {
  titre: string
  debut: string
  fin: string
  latlng: [number, number]
  formats?: Format[]
  options?: Option[]
}

const customKeys = {
  'points': 'square:0abfbff5-ca2e-48b6-ae54-680fa472398c',
  'saisons': 'square:ef2db97d-cf08-47e7-a88a-a26fa5220df8',
  'website': 'square:ae8c4df6-7f90-4d70-9222-5b2832decf1b',
  'bio': 'square:3d5909f1-012a-4c9d-aae8-865cf6be246c',
  'logo': 'square:9bdc0b57-20bb-4c35-a737-500c8aea6bf2'
}

export const load = (async ({ locals, url, params }) => {
  // const filter = url.searchParams.get("service")

  const [ferme, attributes] = await Promise.all([
    await square.customersApi.retrieveCustomer(params.id),
    await square.customerCustomAttributesApi.listCustomerCustomAttributes(params.id)
  ])

  return {
    ferme: ferme.result.customer,
    points: JSON.parse(attributes.result.customAttributes.find(attribute => attribute.key === customKeys['points']).value as string) as Point[],
    saisons: JSON.parse(attributes.result.customAttributes.find(attribute => attribute.key === customKeys['saisons']).value as string) as Saison[],
    website: attributes.result.customAttributes.find(attribute => attribute.key === customKeys['website']).value as string,
    bio: attributes.result.customAttributes.find(attribute => attribute.key === customKeys['bio']).value as string,
    logo: attributes.result.customAttributes.find(attribute => attribute.key === customKeys['logo']).value as string
  }
})