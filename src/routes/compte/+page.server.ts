import { square } from '$lib/clients/square'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { hashPassword } from '$lib/encryption'
import { parse, stringify } from 'devalue'

export const load = (async ({ locals, url, params, cookies }) => {
  console.log(cookies.get('customer'))
  const [customer] = await Promise.all([
    cookies.get('customer') ? await square.customersApi.retrieveCustomer(cookies.get('customer')) : undefined
  ])

  return {
    me: customer?.result.customer
  }
})

export const actions = {
	login: async (event) => {
    const { email, password } = Object.fromEntries(await event.request.formData()) as { [key: string]: string }
    const customer = await square.customersApi.searchCustomers({
      query: {
        filter: {
          emailAddress: {
            exact: 'phil@phils.computer'
          }
        }
      }
    })
    console.log(stringify(customer.result))

    if (!customer.result.customers.length) {
      throw Error('no customer')
    }

    const attributes = await square.customerCustomAttributesApi.listCustomerCustomAttributes(customer.result.customers[0].id)
    console.log(stringify(attributes.result))

    const hash = hashPassword(password as string, attributes.result.customAttributes.find(attribute => attribute.key === 'salt').value as string)

    if (hash.password !== attributes.result.customAttributes.find(attribute => attribute.key === 'pw').value as string) {
      throw Error('wrong password')
    }

    event.cookies.set('customer', customer.result.customers[0].id, { httpOnly: true, path: '/' })
    return { customer: customer.result.customers[0].id   }
	},
  signup: async (event) => {
    const { email, password, givenName, familyName, phoneNumber } = Object.fromEntries(await event.request.formData()) as { [key: string]: string }
    const hash = hashPassword(password as string)

    const customer = await square.customersApi.createCustomer({
      givenName,
      familyName,
      emailAddress: email,
      phoneNumber
    })

    console.log(stringify(customer))

    const attributes = await square.customerCustomAttributesApi.bulkUpsertCustomerCustomAttributes({
      values: {
        'pw': {
          customerId: customer.result.customer.id,
          customAttribute: {
            key: 'pw',
            value: hash.password
          }
        },
        'salt': {
          customerId: customer.result.customer.id,
          customAttribute: {
            key: 'salt',
            value: hash.salt
          }
        }
      }
    })

    console.log(stringify(attributes))

    event.cookies.set('customer', customer.result.customer.id, { httpOnly: true, path: '/' })
    return { customer: customer.result.customer.id }
	},
  resetPassword: async (event) => {
    const { customerId, password } = Object.fromEntries(await event.request.formData()) as { [key: string]: string }
    const hash = hashPassword(password as string)

    const attributes = await square.customerCustomAttributesApi.bulkUpsertCustomerCustomAttributes({
      values: {
        'pw': {
          customerId,
          customAttribute: {
            key: 'pw',
            value: hash.password
          }
        },
        'salt': {
          customerId,
          customAttribute: {
            key: 'salt',
            value: hash.salt
          }
        }
      }
    })

    console.log(stringify(attributes))

    event.cookies.set('customer', customerId, { httpOnly: true, path: '/' })
    return { customer: customerId }
	}
} satisfies Actions