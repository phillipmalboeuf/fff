import { square } from '$lib/clients/square'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	checkout: async (event) => {
    const { ...items } = Object.fromEntries(await event.request.formData())

    const link = await square.checkoutApi.createPaymentLink({
      order: {
        locationId: 'LG3VQ54FBJKSD',
        lineItems: Object.entries(items).map(([catalogObjectId, quantity]) => ({ quantity: quantity.toString(), catalogObjectId })),
      }
    })
    
    return redirect(303, link.result.paymentLink.longUrl)
	}
} satisfies Actions