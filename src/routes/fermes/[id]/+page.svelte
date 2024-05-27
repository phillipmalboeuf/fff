<script lang="ts">
  import { page } from '$app/stores'
  import { adresse, capitalize, frequencyLabel, money, weektime } from '$lib/formatters'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  let point = $state<number>($page.url.searchParams.get('point') ? parseInt($page.url.searchParams.get('point')) : undefined)
  let saison = $state<number>()
  let format = $state<number>()
  let time = $state<number>()
  let frequency = $state<number>()
</script>

<section class="Gris">
  <div class="flex flex--gapped">
    <aside class="col col--6of12">
      <h1 class="h3">{data.ferme.companyName}</h1>
      <p>
        {adresse(data.ferme.address)}<br>
        {data.website}
      </p>
    </aside>

    <fieldset class="col col--6of12">
      <label class="h5" for="point">Point de cueillette</label>
      <select name="point" id="point" bind:value={point} form="ferme">
        {#each data.points as point, i}
        <option value={i}>{point.nom}</option>
        {/each}
      </select>
    </fieldset>

    <main class="col col--6of12">
      <p>{data.bio}</p>
    </main>

    <form class="col col--6of12" action="/fermes/{data.ferme.id}/abonnement" id="ferme">
      <fieldset class="flex flex--tight_gapped">
        <label class="h5" for="saison">Saisonnalité</label>
        {#each data.saisons as s, i}
        <label class="button">
          <input type="radio" name="saison" bind:group={saison} value={i}>
          {s.titre}
        </label>
        {/each}
      </fieldset>

      {#if saison !== undefined}
      <hr>
      <fieldset class="flex flex--tight_gapped">
        <label class="h5" for="saison">Format</label>
        {#each data.saisons[saison].formats as f, i}
        <label class="button">
          <input type="radio" name="format" bind:group={format} value={i}>
          {f.titre || capitalize(f.format)} {money(f.prix)}
        </label>
        {/each}
      </fieldset>

      <hr>
      <fieldset class="flex flex--tight_gapped">
        <label class="h5" for="saison">Options</label>
        {#each data.saisons[saison].options as o, i}
        <label class="button">
          <input type="checkbox" name="option.{i}">
          {o.titre || capitalize(o.option)} +{money(o.prix)}
        </label>
        {/each}
      </fieldset>
      {/if}

      {#if point !== undefined}
      <hr>
      <fieldset class="flex flex--tight_gapped">
        <label class="h5" for="time">Jour et heure de livraison</label>
        {#each data.points[point].times as t, i}
        <label class="button">
          <input type="radio" name="time" bind:group={time} value={i}>
          {weektime(t)}
        </label>
        {/each}
        <hr>
        <label class="button">
          <input type="radio" name="frequency" bind:group={frequency} value={1}>
          {frequencyLabel(1)}
        </label>
        <label class="button">
          <input type="radio" name="frequency" bind:group={frequency} value={2}>
          {frequencyLabel(2)}
        </label>
      </fieldset>
      {/if}
    </form>

    <nav class="col col--12of12 flex flex--tight_gapped flex--center">
      <a class="button button--large" href="/fermes">Retour</a>
      <button form="ferme" class="button--black button--large" class:disabled={point === undefined || saison === undefined || format === undefined || time === undefined || frequency === undefined}>Étape suivante</button>
    </nav>
  </div>
</section>


<style lang="scss">
  section {
    padding: $gap;
    min-height: 100vh;
  }

  section > div {
    max-width: $max;
    margin: 0 auto;

    .h5 {
      display: block;
      width: 100%;
      margin-bottom: $base * 0.5;
    }
  }

  form {
    padding: $base;
    border-radius: $radius;
    background-color: $white;

    display: flex;
    flex-direction: column;
    gap: $base;
  }

  // ol.list--nostyle {
  //   li {
  //     padding: $base * 0.5;
  //   }
  // }
</style>