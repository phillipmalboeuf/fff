<script lang="ts">
  import type { TypeLienSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  export let link: Entry<TypeLienSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  let className: string = undefined
  export { className as class }
</script>

<a class={className} href={link.fields.route} {...link.fields.externe && { target: '_blank', rel: 'external' }}>{link.fields.titre}</a>