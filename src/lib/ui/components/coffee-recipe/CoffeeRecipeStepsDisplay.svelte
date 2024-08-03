<script lang="ts">
    export let steps: string[];
</script>

<div class="flex flex-col">
    {#if steps}    
        {#each steps as step, i }
            <div class="border border-solid rounded-md my-1 p-1">{@html step}</div>
        {/each}
    {/if}
</div>

