<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';
	import type { StepWaterInfo } from "$lib/coffee-recipes";
	import type { StepAdjustmentSelectedOptionConfig, StepConfig } from "$lib/coffee-recipes/CoffeeRecipeTypes";
	import { getStepAdjustmentOptionMessageKey, getStepAdjustmentTitleMessageKey } from "../CoffeeReceipeMessageKeys";
	
    interface DisplayStepAdjustmentProps {
        stepAdjustmentSelectedOptions: StepAdjustmentSelectedOptionConfig[],
        steps: StepConfig[],
        isMethod46: boolean
    }
    let { stepAdjustmentSelectedOptions, steps, isMethod46 }: DisplayStepAdjustmentProps = $props(); 
</script>

<table class="w-full border border-gray-300">
    <tbody>
        {#each stepAdjustmentSelectedOptions as selectedOption}
            <tr>
                <td class="border border-gray-300">
                    <div class="text-sm font-bold ml-2">{getStepAdjustmentTitleMessageKey(selectedOption.stepAdjustment, isMethod46)}</div>
                    <div class="text-sm ml-2">{getStepAdjustmentOptionMessageKey(selectedOption.stepAdjustment, selectedOption.selectedOption, isMethod46)}</div>
                </td>
                
                <td class="border border-gray-300">
                    {#each steps as step }
                        {#if selectedOption.stepAdjustment === step.stepAdjustment }
                        <div class="bg-black text-white text-center rounded text-xs m-1 p-1 w-12 font-bold">{step.stepWaterInfo?.waterInGrams}g</div>
                        {/if}
                    {/each}
                </td>
            </tr>
        {/each}
    </tbody>
</table>

