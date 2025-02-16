<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';
	import type { StepAdjustmentSelectedOptionConfig, StepConfig } from "$lib/coffee-recipes/CoffeeRecipeTypes";
	import { getStepAdjustmentOptionMessageKey, getStepAdjustmentTitleMessageKey } from "../CoffeeReceipeMessageKeys";
	
    interface DisplayStepAdjustmentProps {
        stepAdjustmentSelectedOptions: StepAdjustmentSelectedOptionConfig[],
        steps: StepConfig[],
        recipeId: string
    }
    let { stepAdjustmentSelectedOptions, steps, recipeId }: DisplayStepAdjustmentProps = $props(); 
</script>

<table class="w-full border border-gray-300">
    <tbody>
        {#each stepAdjustmentSelectedOptions as selectedOption}
            <tr>
                <td class="border border-gray-300">
                    <div class="text-sm font-bold ml-2">{getStepAdjustmentTitleMessageKey(selectedOption.stepAdjustmentName, recipeId)}</div>
                    <div class="text-sm ml-2">{getStepAdjustmentOptionMessageKey(selectedOption.stepAdjustmentName, selectedOption.option)}</div>
                </td>
                
                <td class="border border-gray-300">
                    {#each steps as step }
                        {#if selectedOption.stepAdjustmentName === step.stepAdjustment && step.stepWaterInfo?.waterInGrams > 0 }
                            <div class="m-1 flex">
                                <div class="bg-black text-white text-center rounded text-xs p-1 w-12 font-bold">{step.stepWaterInfo?.waterInGrams}g</div>
                                <div class="text-center text-xs p-1 w-12 font-bold">({step.durationInSeconds}s)</div>
                            </div>
                        {/if}
                    {/each}
                </td>
            </tr>
        {/each}
    </tbody>
</table>

