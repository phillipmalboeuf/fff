<script lang="ts">
  import { capitalize } from '$lib/formatters'

  let { dates, exceptions }: { dates: Date[], exceptions: Date[] } = $props()
  let months = $derived.by(() => dates.reduce((ms, date) => {
    return {
      ...ms,
      [date.getMonth()]: {
        title: date.toLocaleDateString('fr-CA', { year: "numeric", month: "long" }),
        month: date.getMonth(),
        year: date.getFullYear(),
        first: new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
        last: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
      }
    }
  }, {} as {
    [k: number]: {
      title: string
      first: number
      last: number
      month: number
      year: number
    }
  }))
</script>

<section class="flex flex--gapped">
  {#each Object.values(months) as month}
  <figure class="col col--3of12">
    <small>{capitalize(month.title)}</small>
    <ol class="list--nostyle flex">
      {#each [...Array(month.first).keys()] as d}
      <li class="col col--1of7"></li>
      {/each}
      {#each [...Array(month.last).keys()] as d}
      <li class="col col--1of7" class:active={dates.find(date => date.toDateString() === new Date(month.year, month.month, d + 1).toDateString())} class:disabled={exceptions?.find(date => date.toDateString() === new Date(month.year, month.month, d + 1).toDateString())}><small>{d + 1}</small></li>
      {/each}
    </ol>
  </figure>
  {/each}
</section>


<style lang="scss">
  figure {
    > small {
      display: block;
      text-align: center;
      margin-bottom: $base * 0.5;
    }
    
    ol {
      row-gap: $base * 0.1;

      li {
        text-align: center;
        padding: $base * 0.1;
        border-radius: 50%;

        small {
          display: block;
        }

        &.active {
          color: $white;
          background-color: $black;
        }

        &.disabled {
          opacity: 0.5;
        }
      }
    }
  }
  
</style>