<script lang="ts">
  import type { Document } from '@contentful/rich-text-types'
  import Media from './Media.svelte'

  let { body }: { body: Document } = $props()
</script>

{#snippet m(mark)}
{#if mark.nodeType === 'text'}
{#if mark.marks.length > 0}
  {#if mark.marks[0].type === 'italic'}
  <em>{@render m({ ...mark, marks: mark.marks.slice(1) })}</em>
  {:else if mark.marks[0].type === 'bold'}
  <strong>{@render m({ ...mark, marks: mark.marks.slice(1) })}</strong>
  {:else if mark.marks[0].type === 'underline'}
  <u>{@render m({ ...mark, marks: mark.marks.slice(1) })}</u>
  {:else if mark.marks[0].type === 'code'}
  {@html mark.value}
  {/if}
{:else}
{mark.value}
{/if}
{:else if mark.nodeType === 'hyperlink'}
<a href="{mark.data.uri}" target="{mark.data.uri.indexOf('http') === 0 ? '_blank' : '_self'}">
  {#each mark.content as _mark}{@render m(_mark)}{/each}
</a>
{:else if mark.nodeType === 'asset-hyperlink'}
<a href="{mark.data.target.fields.file.url}" target="_blank">
  {#each mark.content as _mark}{@render m(_mark)}{/each}
</a>
{/if}
{/snippet}

{#snippet n(node)}
{#if node.nodeType === 'heading-1'}
  <h1>{#each node.content as mark}{@render m(mark)}{/each}</h1>
{:else if node.nodeType === 'heading-2'}
  <h2>{#each node.content as mark}{@render m(mark)}{/each}</h2>
{:else if node.nodeType === 'heading-3'}
  <h3>{#each node.content as mark}{@render m(mark)}{/each}</h3>
{:else if node.nodeType === 'heading-4'}
  <h4>{#each node.content as mark}{@render m(mark)}{/each}</h4>
{:else if node.nodeType === 'heading-5'}
  <h5>{#each node.content as mark}{@render m(mark)}{/each}</h5>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each node.content as mark}{@render m(mark)}{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  <p>{#each node.content as mark}{@render m(mark)}{/each}</p>
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each node.content as item}<li>{#each item.content as node}{@render n(node)}{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'ordered-list'}
  <ol>
    {#each node.content as item}<li>{#each item.content as node}{@render n(node)}{/each}</li>{/each}
  </ol>

{:else if node.nodeType === 'table'}
  <table>
    <tbody>
    {#each node.content as item}<tr>{#each item.content as node}{@render n(node)}{/each}</tr>{/each}
    </tbody>
  </table>
{:else if node.nodeType === 'table-header-cell'}
  <th data-content="{node.content[0]?.content[0]?.value}">{#each node.content as item}{@render n(item)}{/each}</th>
{:else if node.nodeType === 'table-cell'}
  <td>{#each node.content as item}{@render n(item)}{/each}</td>

{:else if node.nodeType === 'blockquote'}
  <blockquote>{#each node.content as code}{@render n(code)}{/each}</blockquote>

{:else if node.nodeType === 'embedded-asset-block'}
  <figure>
    <Media media={node.data.target} />
    {#if node.data.target.fields.description}
    <figcaption>{node.data.target.fields.description}</figcaption>
    {/if}
  </figure>
{:else if node.nodeType === 'embedded-entry-block'}
{/if}
{/snippet}

{#each body.content as node}
{@render n(node)}
{/each}