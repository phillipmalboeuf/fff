<script lang="ts">
  import type { TypeLienSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'

  let { link, className = undefined, more = undefined }: {
    link: Entry<TypeLienSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    more?: Snippet
    className?: string
  } = $props()
</script>

<a class={className} href={link.fields.route} {...link.fields.externe && { target: '_blank', rel: 'external' }}>{link.fields.titre}{#if more}{@render more()}{/if}</a>