<script lang="ts">
  import { MapLibre, Marker, NavigationControl, Popup } from 'svelte-maplibre'
  import Icon from '$lib/components/Icon.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  let selection = $state<string>()
</script>

<main class="flex flex--tight_gapped">
  <form class="col col--4of12">
    <ol class="list--nostyle">
      {#each data.fermes as ferme}
      <li>
        <label>
          <input type="radio" name="point" bind:group={selection} value={ferme.id}>
          {ferme.companyName}<br>
          {ferme.address.addressLine1}, {ferme.address.locality}, {ferme.address.postalCode}
        </label>
      </li>
      {#each ferme.points as point, i}
      <li>
        <label>
          <input type="radio" name="point" bind:group={selection} value={`${ferme.id}?point=${i}`}>
          {point.nom}<br>
          {point.adresse}
        </label>
      </li>
      {/each}
      {/each}
    </ol>
  </form>

  <figure class="col col--8of12">
    <MapLibre 
      center={[-72.6,45.8]}
      zoom={8}
      class="map"
      standardControls={false}
      attributionControl={false}
      locale="fr-FR"
      style="/style.json">
      <NavigationControl position="top-right" />
      {#each data.fermes as ferme}
        {#each ferme.points as { nom, adresse, latlng }}
        <Marker
          class="marker"
          lngLat={latlng.toReversed() as [number, number]}
        >
          <Icon i="point" label={nom} />
          <Popup openOn="hover" offset={[0, -10]}>
            <div>{nom} {adresse}</div>
            <div>{ferme.companyName}</div>
          </Popup>
        </Marker>
        {/each}
      {/each}
    </MapLibre>
  </figure>

  <a class="button button--black" href="/fermes/{selection}" class:disabled={!selection}>Étape suivante</a>
</main>


<style lang="scss">
  main {
    padding: $base;
  }

  form {
    padding: $base;
    border-radius: $radius;
    background-color: $white;
  }

  figure {
    :global(.map) {
      height: 75vh;
      border-radius: $radius;

      :global(.marker) {
        cursor: pointer;

        :global(path) {
          fill: $green;
        }
      }
    }
  }

  ol.list--nostyle {
    li {
      padding: $base * 0.5;
    }
  }
</style>