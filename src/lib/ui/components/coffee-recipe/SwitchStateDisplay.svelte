<script lang="ts">
    import { SwitchState } from '$lib/coffee-recipes';
	import { switchStateMessageKey } from '$lib/coffee-recipes/CoffeeReceipeMessageKeys';

    let { switchState, highlightState = false } = $props();
</script>

<div>
    {#if SwitchState.OPEN === switchState}
        <!-- <div class=" w-12 font-bold text-xs { highlightState? "bg-indigo-500" : "bg-slate-300" } text-white text-center"> -->
        <div class=" w-12 font-bold text-xs bg-white text-black text-center">
            {switchStateMessageKey(switchState)()}
        </div>
    {/if}

    {#if SwitchState.CLOSED === switchState}
        <!-- <div class=" w-12 font-bold text-xs { highlightState? "bg-rose-400" : "bg-slate-300" } text-white text-center"> -->
        <div class=" w-12 font-bold text-xs bg-black text-white text-center">
            {switchStateMessageKey(switchState)()}
        </div>
    {/if}
</div>