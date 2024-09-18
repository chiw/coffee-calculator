<script lang="ts">
    export let steps: string[];

    import RecipeParametersCardDisplay from "./RecipeParametersCardDisplay.svelte";
    import StepMessageDisplay from "./StepMessageDisplay.svelte";
</script>

<RecipeParametersCardDisplay />

<div class="flex flex-col divide-y divide-slate-300 py-1">
    {#if steps}    
        {#each steps as step, i }
            <!-- <div class="my-1 p-1">{@html step.msgKey(step.params)}</div> -->
            <StepMessageDisplay step={step} />
        {/each}
    {/if}
</div>

