// import type { TypePageSkeleton, TypeCollectionSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'
// import { content } from '$lib/clients/contentful'
// import type { Entry } from 'contentful'

import { square } from '$lib/clients/square'

export type Point = {
  nom: string
  adresse: string
  latlng: [number, number]
  times: [number, number, number][]
}

export const load = (async ({ locals, url, params }) => {
  // const filter = url.searchParams.get("service")

  const [fermes] = await Promise.all([
    await square.customersApi.searchCustomers({
      query: {
        filter: {
          segmentIds: {
            any: [
              'gv2:KJF128YRW94YVC0WGSH8TPE8R8'
            ]
          }
        }
      }
    })
  ])

  return {
    fermes: await Promise.all(fermes.result.customers.map(async customer => ({
      ...customer,
      points: JSON.parse((await square.customerCustomAttributesApi.retrieveCustomerCustomAttribute(customer.id, 'square:0abfbff5-ca2e-48b6-ae54-680fa472398c')).result.customAttribute.value as string) as Point[]
    })))
  }
})