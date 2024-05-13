import { json, text } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { Item } from '$lib/services/cart.svelte'
import { square } from '$lib/clients/square'
import { stringify } from 'devalue'

export const POST: RequestHandler = async ({ request }) => {
	const { items } = await request.json()

  console.log(items)
  const order = await square.ordersApi.calculateOrder({
    order: {
      locationId: 'LG3VQ54FBJKSD',
      lineItems: (items as Item[]).map((item) => ({ quantity: item.quantity.toString(), catalogObjectId: item.id })),
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

	return text(stringify(order.result.order))
}