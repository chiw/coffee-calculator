<script lang="ts">
    import type { Reference } from "$lib/recipes/reference.type";

    export let references: Reference[];
</script>

<div class="flex flex-col">
    {#if references}
        {#each references as reference, i}
            <div> <a href={reference.url}>{reference.description}</a></div>
        {/each}
    {/if}
</div>