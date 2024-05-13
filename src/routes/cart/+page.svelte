<script lang="ts">
  import type { Order } from 'square'
  import { parse } from 'devalue'

  import { enhance } from '$app/forms'
  import { money } from '$lib/formatters'
  import { updateItemQuantity, useCart } from '$lib/services/cart.svelte'

  import Icon from '$lib/components/Icon.svelte'

  const cart = useCart()
  let order = $state<Order>()
  let waiting = $state(false)

  $effect(() => {
    waiting = true
    
    fetch('/cart/calculate', {
			method: 'POST',
			body: JSON.stringify({ items: cart.items }),
			headers: {
				'content-type': 'application/json',
			},
		}).then(response => response.text()).then(data => {
      waiting = false
      order = parse(data)
    })
  })
</script>

<form action="/cart?/checkout" method="post" enctype="multipart/form-data">
 <ol class="list--nostyle">
  {#each cart.items as item, i}
  <li class="flex flex--tight_gapped flex--middle">
    <h6>{item.name}</h6>
    <button type="button" onclick={() => updateItemQuantity(item.id, item.quantity - 1)}><Icon i="minus" label="Moins 1" /></button>
    <input type="number" name={item.id} value={item.quantity} />
    <button type="button" onclick={() => updateItemQuantity(item.id, item.quantity + 1)}><Icon i="plus" label="Plus 1" /></button>

    <em>{money(item.price)}</em>
  </li>
  {/each}


  {#if cart.items.length}
  <li>Sous-total <em>{money(cart.subTotal)}</em></li>

  {#if order}
  {#each order.taxes as tax}
  <li class:waiting>{tax.name} <em>{money(Number(tax.appliedMoney.amount) / 100)}</em></li>
  {/each}

  <li class:waiting>Total <em>{money(Number(order.totalMoney.amount) / 100)}</em></li>
  {/if}

  <li><button type="submit" class="button button--black">Passer à la caisse</button></li>
  {:else}
  <li><a href="/boutique" class="button">Boutique</a></li>
  {/if}
  </ol>
</form>

<style lang="scss">
  form {
    padding: $base;
    padding-top: $base * 4;

    input[type="number"] {
      width: $base * 2;
      -webkit-appearance: none;
      appearance: none;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    li {
      &.waiting {
        opacity: 0.5;
      }
    }
  }
</style>