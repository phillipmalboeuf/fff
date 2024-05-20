// import type { TypePageSkeleton, TypeCollectionSkeleton, TypeProductSkeleton } from '$lib/clients/content_types'
// import { content } from '$lib/clients/contentful'
// import type { Entry } from 'contentful'

import type { Actions } from './$types'

import { square } from '$lib/clients/square'
import { redirect } from '@sveltejs/kit'
import { parse } from 'devalue'
import type { Item } from '$lib/services/cart.svelte'
import { dates } from '$lib/dates'


export const load = (async ({ locals, url, params, parent }) => {
  const { points, saisons, exceptions } = await parent()
  const point = points[parseInt(url.searchParams.get("point"))]
  const saison = saisons[parseInt(url.searchParams.get("saison"))]
  const format = saison.formats[parseInt(url.searchParams.get("format"))]
  const time = point.times[parseInt(url.searchParams.get("time"))]
  const frequency = parseInt(url.searchParams.get("frequency"))

  const dts = dates(saison, frequency, time[0], time[1], exceptions)

  const options = Array.from(url.searchParams.entries()).filter(([key, value]) => key.includes('option') && value === 'on').map(([key, value]) => parseInt(key.split('.')[1])).map(o => ({
    ...saison.options[o],
    total: saison.options[o].prix * dts.length
  }))

  const [panier, don, cotisation, option] = await Promise.all([
    square.catalogApi.retrieveCatalogObject('HMN6IXICYRBNC6I6A4WK4CI7'),
    square.catalogApi.retrieveCatalogObject('3QDZIS3QEIYKD5DG7WAQQKJP'),
    square.catalogApi.retrieveCatalogObject('4WPQRJAZ66XPFT3CUDE7D3Q4'),
    square.catalogApi.retrieveCatalogObject('LNQ4JEJRE4F4D7MLWXAHKQOT'),
  ])

  console.log(options)

  return {
    dates: dts,
    point,
    saison,
    format,
    time,
    frequency,
    options,
    option: option.result.object,
    panier: panier.result.object,
    don: don.result.object,
    cotisation: cotisation.result.object,
  }
})

export const actions = {
	checkout: async (event) => {
    const { items } = Object.fromEntries(await event.request.formData())

    const link = await square.checkoutApi.createPaymentLink({
      order: {
        locationId: 'LG3VQ54FBJKSD',
        lineItems: (parse(items as string) as Item[]).map(item => ({
          ...item.name ? { variationName: item.name } : {},
          catalogObjectId: item.id,
          quantity: item.quantity.toString(),
          basePriceMoney: { amount: BigInt(item.price * 100), currency: 'CAD' }
        })),
        taxes: [
          {
            name: 'TPS',
            percentage: '5',
            scope: 'ORDER',
            type: 'ADDITIVE'
          },
          {
            name: 'TVQ',
            percentage: '9.975',
            scope: 'ORDER',
            type: 'ADDITIVE'
          }
        ]
      }
    })
    
    return redirect(303, link.result.paymentLink.longUrl)
	}
} satisfies Actions