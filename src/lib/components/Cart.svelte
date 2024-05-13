<script lang="ts">
  import { fly } from 'svelte/transition'
  import { page } from '$app/stores'

  import { useCart, updateItemQuantity } from '$lib/services/cart.svelte'
  import { money } from '$lib/formatters'
  
  import Icon from './Icon.svelte'

  const cart = useCart()

  let visible = $state(false)
  $effect(() => {
    if (cart.items.length && $page.route.id !== '/cart') {
      visible = true
    }
	})
</script>

<a href="/cart" class="button" onclick={(e) => {
  e.preventDefault()
  visible = !visible
}}>
  <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 5.99345L20.9187 5.79687L20.8029 5.24317C20.8029 5.18311 20.6699 4.22534 20.6699 4.22534C20.6699 4.22534 19.0478 3.88569 19.0478 3.91846C19.0478 3.91846 18.7744 3.96542 18.2965 3.99054L18.8581 3.86822C18.5847 3.34292 18.0415 2.59483 18.0415 2.59483C18.0415 2.59483 17.8112 2.13178 17.6597 1.91227C17.0821 1.07463 16.1706 0.385511 15.0929 0.117947C14.6544 0.117947 13.8501 0.0971969 13.8501 0.0971969H12.4941L12.1775 0H8.60692C7.89009 0 7.26194 0.0971969 7.26194 0.0971969C6.30739 0.0971969 4.69513 0.793957 4.69513 0.793957C4.69513 0.793957 3.23806 2.03786 2.95355 2.90171C2.85748 3.19439 2.67396 3.63997 2.41531 4.00473H2.1776C1.55314 4.00473 1.16639 3.91736 1.1085 3.91736C1.05431 4.02876 0 4.90681 0 4.90681L0.00739003 6.3735L0.166276 6.68912L0.0320235 12.9785C0.0320235 13.5912 -0.0258651 15.7383 2.25026 17.1547C2.25889 17.1547 5.50927 18 5.50927 18L7.22252 17.9159H10.1576L10.8596 17.6898L11.8709 17.9159H15.3897C17.4294 17.9159 19.5121 17.0477 20.1772 15.4827C20.1896 15.4532 20.9175 13.0004 20.9433 12.9785C20.9433 12.9785 20.7475 12.2861 20.7475 11.5238C20.7475 10.0233 21 5.99454 21 5.99454V5.99345ZM4.31578 4.00582C4.28252 3.75246 4.20616 3.50237 4.20246 3.2621C4.20123 3.15071 4.18768 2.917 4.18029 2.92355C4.18768 2.91263 4.70006 2.28795 4.95255 1.91227C5.38364 1.27011 6.52047 0.980706 7.48117 0.980706H13.5484L13.9906 1.01347C14.3995 1.01347 14.5744 1.01565 14.8971 1.13469C15.1015 1.21005 15.6595 1.34328 15.6595 1.34328C15.6595 1.34328 16.0043 1.65235 16.0561 1.70695C16.3788 2.0455 16.6374 2.31635 16.8185 2.78704C16.8308 2.81762 16.8419 2.84929 16.853 2.88096C16.9774 3.2348 16.9527 3.59738 16.8653 4.00582H12.7601C12.0778 4.00582 10.3029 3.72625 10.3029 3.72625C10.3029 3.72625 9.18334 3.8715 7.59941 3.91955C6.48106 3.9534 5.03631 4.00473 4.31578 4.00473V4.00582Z"/>
  </svg>
  {#if cart.items.length}<strong>{cart.totalQuantity}</strong>{/if}
</a>

{#if visible}
<main transition:fly={{ y: -100 }}>
  <ol class="list--nostyle">
  {#each cart.items as item}
  <li class="flex flex--tight_gapped flex--middle">
    <h6>{item.name}</h6>
    <button onclick={() => updateItemQuantity(item.id, item.quantity - 1)}><Icon i="minus" label="Moins 1" /></button>
    {item.quantity}
    <button onclick={() => updateItemQuantity(item.id, item.quantity + 1)}><Icon i="plus" label="Plus 1" /></button>

    <em>{money(item.price)}</em>
  </li>
  {/each}

  {#if cart.items.length}
  <li>Sous-total <em>{money(cart.subTotal)}</em></li>
  <li><a href="/cart" class="button button--black" onclick={() => visible = false}>Continuer vers le panier</a></li>
  {:else}
  <li><a href="/boutique" class="button" onclick={() => visible = false}>Boutique</a></li>
  {/if}
  </ol>

  
</main>
{/if}

<style lang="scss">
  main {
    position: absolute;
    top: 100%;
    right: $base;

    background-color: $white;
    border-radius: $radius;
    padding: $base;

    ol {
      display: flex;
      flex-direction: column;
      gap: $base;

      li {
        h6 {
          width: 100%;
        }

        button {
          :global(svg) {
            height: $base * 0.5;
            width: $base * 0.5;
          }
        }

        a.button {
          width: 100%;
        }
      }
    }
  }
</style>