<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';
	import type { StepAdjustmentAvailableOptions, StepAdjustmentSelectedOptionConfig } from "$lib/coffee-recipes/CoffeeRecipeTypes.d";
	import { getStepAdjustmentOptionMessageKey, getStepAdjustmentTitleMessageKey } from '../CoffeeReceipeMessageKeys';

    interface ConfigStepAdjustmentProps {
        stepAdjustmentSelectedOption: StepAdjustmentSelectedOptionConfig,
        stepAdjustmentAvailableOptions: StepAdjustmentAvailableOptions,
        handleSelect: any,
        isMethod46: boolean
    }    

    let { stepAdjustmentSelectedOption, stepAdjustmentAvailableOptions, handleSelect, isMethod46} : ConfigStepAdjustmentProps = $props();

    let selectedOption = $state(stepAdjustmentSelectedOption.selectedOption);

    $effect(() => {
        console.log('ConfigStepAdjustment handleSelect');
        handleSelect(stepAdjustmentAvailableOptions.stepAdjustment, selectedOption);
    });

    // const getStepAdjustmentTitleMessageKey = (stepAdjustment: string) => {
    //     let messageKey = "m." + "label_" + stepAdjustment + "_title";
    //     return eval(messageKey)();
    // }

    // const getStepAdjustmentOptionMessageKey = (stepAdjustment: string, option: string) => {
    //     let messageKey = "m." + "label_" + stepAdjustment + "_" + option;
    //     // console.log('getStepAdjustmentOptionMessageKey', messageKey);
    //     return eval(messageKey)();
    // }
</script>

<div class="mt-4"></div>
<div class="text-sm font-bold mb-2">{getStepAdjustmentTitleMessageKey(stepAdjustmentSelectedOption.stepAdjustment, isMethod46)}</div>

<fieldset class="flex flex-wrap gap-2">
{#each stepAdjustmentAvailableOptions.availableOptions as availableOption, i }
    
    <div>
        <label class="flex cursor-pointer items-center justify-center rounded 
            border border-gray-300 bg-white px-2 py-1 text-gray-900 
            hover:border-gray-900 
            has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
        >
          <input type="radio" name={stepAdjustmentAvailableOptions.stepAdjustment + 'Radio'} bind:group={selectedOption} value={availableOption} 
            class="sr-only"
          />
    
          <p class="text-xs font-bold">{getStepAdjustmentOptionMessageKey(stepAdjustmentAvailableOptions.stepAdjustment, availableOption, isMethod46)}</p>
        </label>
    </div>
{/each}
</fieldset>
