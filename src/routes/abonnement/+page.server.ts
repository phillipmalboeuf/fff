// import type { TypePageSkeleton, TypeCollectionSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'
// import { content } from '$lib/clients/contentful'
// import type { Entry } from 'contentful'

import { square } from '$lib/clients/square'

export const load = (async ({ locals, url, params }) => {
  // const filter = url.searchParams.get("service")

  const [plans] = await Promise.all([
    // await square.catalogApi.searchCatalogItems({
    //   enabledLocationIds: [
    //     'LG3VQ54FBJKSD'
    //   ],
    // }),
    await square.catalogApi.searchCatalogObjects({
      objectTypes: ['SUBSCRIPTION_PLAN'],
      // includeRelatedObjects: true,
    }, {
      
    })
    // await square.catalogApi.listCatalog(undefined, 'CATEGORY')
    // content.getEntries<TypeCollectionSkeleton>({ content_type: "collection", include: 2 }),
    // content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": "products" }),
    // url.searchParams?.size && content.getEntries<TypeProductSkeleton>({ content_type: "product", include: 2 }),
  ])

  return {
    items: await square.catalogApi.batchRetrieveCatalogObjects({
      objectIds: plans.result.objects.find(o => o.id === 'MZUBD2ZJRCGYUTD6FPYACEWH').subscriptionPlanData.eligibleItemIds,
      includeRelatedObjects: true
    }),
    plans: plans.result.objects.find(o => o.id === 'MZUBD2ZJRCGYUTD6FPYACEWH'),
    // items: items.result.items.map(async item => ({
    //   ...item,
    //   images: await Promise.all(item.itemData.imageIds.map(async image => square.catalogApi.retrieveCatalogObject(image)))
    // })),
    // collections,
    // page: pages.items[0]
  }
})