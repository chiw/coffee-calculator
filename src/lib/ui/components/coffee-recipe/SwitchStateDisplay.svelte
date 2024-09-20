<script lang="ts">
	import { SwitchState } from "$lib/coffee-recipes";
	import { switchStateMessageKey } from "./CoffeeReceipeMessageKeys";

    let { switchState, highlightState = false, isImmersionDripperRecipe = false, durationInSeconds } = $props();
</script>

<div>
    {#if SwitchState.OPEN === switchState && isImmersionDripperRecipe}
        <!-- <div class=" w-12 font-bold text-xs { highlightState? "bg-indigo-500" : "bg-slate-300" } text-white text-center"> -->
        <div class=" w-12 font-bold text-xs bg-white text-black text-center">
            {switchStateMessageKey(switchState)()}
        </div>
    {:else if SwitchState.CLOSED === switchState && isImmersionDripperRecipe}
        <!-- <div class=" w-12 font-bold text-xs { highlightState? "bg-rose-400" : "bg-slate-300" } text-white text-center"> -->
        <div class=" w-12 font-bold text-xs bg-black text-white text-center">
            {switchStateMessageKey(switchState)()}
        </div>
    {:else}
        <div class=" w-12 font-bold text-xs bg-black text-white text-center">
            {durationInSeconds}s
        </div>
    {/if}
</div>