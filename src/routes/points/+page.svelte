<script lang="ts">
  import { MapLibre, Marker, NavigationControl, Popup } from 'svelte-maplibre'
  import Icon from '$lib/components/Icon.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<main class="flex">
  <aside class="col col--4of12">
    <ol class="list--nostyle flex">
      {#each data.fermes as ferme}
      <li class="col col--3of12">
        {ferme.points.map(point => [point.nom, point.adresse, point.latlng])}
      </li>
      {/each}
    </ol>
  </aside>
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
</main>


<style lang="scss">
  main {
    padding: $base;
  }

  figure {
    :global(.map) {
      height: 75vh;

      :global(.marker) {
        cursor: pointer;

        :global(path) {
          fill: $green;
        }
      }
    }
  }

  ol.list--nostyle {
    padding: $base;
    padding-top: $base * 4;

    li {
      text-align: center;
      padding: $base * 0.5;
    }
  }
</style>