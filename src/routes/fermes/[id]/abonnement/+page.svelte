<script lang="ts">
  import { adresse, capitalize, dt, frequencyLabel, money, weektime } from '$lib/formatters'
  import type { Order } from 'square'
  import type { Item } from '$lib/services/cart.svelte'
  import { parse, stringify } from 'devalue'

  import Calendar from '$lib/components/Calendar.svelte'
  import Icon from '$lib/components/Icon.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  // let point = $state<number>($page.url.searchParams.get('point') ? parseInt($page.url.searchParams.get('point')) : undefined)
  // let saison = $state<number>()
  // let format = $state<number>()
  let don = $state<number>()
  let order = $state<Order>()
  let waiting = $state(false)

  let items = $derived.by<Item[]>(() => ([
    {
      name: data.format.titre || data.format.format,
      id: data.panier.itemData.variations.find(v => v.itemVariationData.name.toLowerCase() === data.format.format).id,
      quantity: 1,
      price: data.format.prix
    },
    ...data.options?.length ? data.options.map(option => ({
      name: option.titre || option.option,
      id: data.option.itemData.variations.find(v => v.itemVariationData.sku === option.option)?.id || data.option.itemData.variations.find(v => v.itemVariationData.sku === 'autre').id,
      quantity: data.dates.length,
      price: option.prix
    }))  : [],
    ...don ? [{
      id: data.don.itemData.variations.find(v => Number(v.itemVariationData.priceMoney.amount) === don * 100)?.id || data.don.itemData.variations.find(v => v.itemVariationData.pricingType === 'VARIABLE_PRICING')?.id,
      quantity: 1,
      price: don
    }]  : [],
    {
      id: data.cotisation.itemData.variations[0].id,
      quantity: 1,
      price: Number(data.cotisation.itemData.variations[0].itemVariationData.priceMoney.amount) / 100
    }
  ]))

  $effect(() => {
    waiting = true
    
    fetch('/cart/calculate', {
			method: 'POST',
			body: JSON.stringify({ items }),
			headers: {
				'content-type': 'application/json',
			},
		}).then(response => response.text()).then(data => {
      waiting = false
      order = parse(data)
    })
  })
</script>

<section class="flex flex--gapped">
  <aside class="col col--6of12 flex flex--gapped">
    <h1 class="h5">Abonnement</h1>

    <div class="col col--6of12">
      <p>Phillip, Malboeuf</p>
      <p>
        {data.point.nom}<br>
        <strong>{data.ferme.companyName}</strong>
      </p>
      <p>
        {data.saison.titre}<br>
        {data.format.titre || capitalize(data.format.format)}<br>
        {#each data.options as option}
        {capitalize(option.titre || option.option)} +{money(option.prix)}<br>
        {/each}
      </p>
    </div>
    <div class="col col--6of12">
      <p>Jour et heure<br>{weektime(data.time)}</p>
      <p>Fréquence<br>{frequencyLabel(data.frequency)}</p>
      <!-- <p>Jour et heure<br>{weektime(data.time)}</p> -->
    </div>

    <div class="col col--12of12">
      <Calendar dates={data.dates} exceptions={data.exceptions.map(e => dt(e, data.time[1] + 4, 0, 0))} />
    </div>

    <hr>

    <div class="col col--6of12">Don</div>
    <div class="col col--6of12"><small>Contribuez à l'essor de l'agriculture biologique de proximité! Un don aujourd'hui sème la réussite des projets agricoles de demain.</small></div>
    <fieldset class="col col--12of12 flex flex--gapped">
      {#each data.don.itemData.variations as d, i}
      <label class="button button--large">
        {#if d.itemVariationData.priceMoney}
        <input type="radio" name="time" form="abonnement" bind:group={don} value={Number(d.itemVariationData.priceMoney.amount) / 100}>
        {money(Number(d.itemVariationData.priceMoney.amount) / 100)}
        {/if}
      </label>
      {/each}
      <label class="button button--large">
        <input type="radio" name="time" form="abonnement" bind:group={don} value={0}>
        Une autre fois
      </label>
    </fieldset>
  </aside>

  <form action="?/checkout" method="post" id="abonnement" class="col col--6of12">
    <h5>Récapitulatif du panier</h5>

    <div class="flex flex--spaced">

      <div class="col col--6of12">{capitalize(data.format.titre || data.format.format)}</div>
      <div class="col">{money(data.format.prix)}</div>

      {#each data.options as option}
      <div class="col col--6of12">{capitalize(option.titre || option.option)}</div>
      <div class="col">{money(option.total)}</div>
      {/each}

      <hr>

      <div class="col col--6of12">Sous-total</div>
      <div class="col"><strong>{money(data.format.prix + data.options.reduce((t, option) => t + (option.prix * data.dates.length), 0))}</strong></div>

      {#if don}
      <div class="col col--6of12">Don</div>
      <div class="col">{money(don)}</div>
      {/if}
      <div class="col col--6of12">Frais de cotisation annuelle *</div>
      <div class="col">{money(25.5)}</div>

      {#if order}
      {#each order.taxes as tax}
      <div class="col col--6of12" class:waiting>{tax.name}</div>
      <div class="col" class:waiting>{money(Number(tax.appliedMoney.amount) / 100)}</div>
      {/each}

      <hr>
      <div class="col col--6of12" class:waiting><h4>Total</h4></div>
      <div class="col" class:waiting><h4>{money(Number(order.totalMoney.amount) / 100)}</h4></div>
      {/if}
    </div>

    <input type="hidden" name={"items"} value={stringify(items)} />
  </form>

  <nav class="col col--12of12 flex flex--tight_gapped flex--center">
    <a class="button button--large" href="/fermes/{data.ferme.id}">Retour</a>
    <button form="abonnement" class="button--black button--large">Passer à la caisse</button>
  </nav>
</section>


<style lang="scss">
  section {
    padding: $base;
    max-width: $max;
    margin: 0 auto;

    .h5,
    hr {
      display: block;
      width: 100%;
      margin-bottom: $base * 0.5;
    }
  }

  fieldset {
    label.button.button--large {
      background-color: $white;
    }
  }

  aside {
    padding: $base;
  }

  form {
    padding: $base;
    border-radius: $radius;
    background-color: $white;

    display: flex;
    flex-direction: column;
    gap: $base;

    div {
      &.waiting {
        opacity: 0.5;
      }
    }
  }

  // ol.list--nostyle {
  //   li {
  //     padding: $base * 0.5;
  //   }
  // }
</style>