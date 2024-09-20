<script lang="ts">
	import { isPauseStage } from "$lib/coffee-recipes/PourOverStage";

    let { durationInSeconds, pouringStage} = $props();
</script>

<div>
    {#if isPauseStage(pouringStage)}
        <div class=" w-12 font-bold text-xs bg-white text-black text-center">
            {durationInSeconds}s
        </div>
    {:else}
        <div class=" w-12 font-bold text-xs bg-black text-white text-center">
            {durationInSeconds}s
        </div>
    {/if}
</div>