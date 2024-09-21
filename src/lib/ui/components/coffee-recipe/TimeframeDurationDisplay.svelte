<script lang="ts">
	import type { PourOverStage } from "$lib/coffee-recipes";
	import { isPauseStage } from "$lib/utils/CoffeeRecipeUtils";

	// import { isPauseStage } from "$lib/coffee-recipes/PourOverStage";

    interface TimeframeDurationDisplay {
        durationInSeconds: number
        pouringStage: PourOverStage
    }

    let { durationInSeconds, pouringStage} : TimeframeDurationDisplay = $props();
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