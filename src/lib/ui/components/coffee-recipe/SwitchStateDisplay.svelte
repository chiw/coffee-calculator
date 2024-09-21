<script lang="ts">
	import { SwitchState } from "$lib/coffee-recipes";


	import { switchStateMessage } from "./CoffeeReceipeMessageKeys";

    interface SwitchStateDisplayProps {
        switchState: SwitchState,
        highlightState: boolean,
        isImmersionDripperRecipe: boolean,
        durationInSeconds: number
    }

    let { switchState, highlightState = false, isImmersionDripperRecipe = false, durationInSeconds }: SwitchStateDisplayProps = $props();
</script>

<div>
    {#if SwitchState.OPEN === switchState && isImmersionDripperRecipe}
        <!-- <div class=" w-12 font-bold text-xs { highlightState? "bg-indigo-500" : "bg-slate-300" } text-white text-center"> -->
        <div class=" w-12 font-bold text-xs bg-white text-black text-center">
            {switchStateMessage(switchState)}
        </div>
    {:else if SwitchState.CLOSED === switchState && isImmersionDripperRecipe}
        <!-- <div class=" w-12 font-bold text-xs { highlightState? "bg-rose-400" : "bg-slate-300" } text-white text-center"> -->
        <div class=" w-12 font-bold text-xs bg-black text-white text-center">
            {switchStateMessage(switchState)}
        </div>
    {:else}
        <div class=" w-12 font-bold text-xs bg-black text-white text-center">
            {durationInSeconds}s
        </div>
    {/if}
</div>