<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import type {
		StepAdjustmentAvailableOptions,
		StepAdjustmentSelectedOptionConfig
	} from '$lib/coffee-recipes/CoffeeRecipeTypes.d';
	import {
		getStepAdjustmentOptionMessageKey,
		getStepAdjustmentTitleMessageKey
	} from '../CoffeeReceipeMessageKeys';
	// import { onMount } from 'svelte';

	interface ConfigStepAdjustmentProps {
		stepAdjustmentSelectedOption: StepAdjustmentSelectedOptionConfig;
		stepAdjustmentAvailableOptions: StepAdjustmentAvailableOptions;
		handleSelect: any;
		recipeId: string;
	}

	let {
		stepAdjustmentSelectedOption,
		stepAdjustmentAvailableOptions,
		handleSelect,
		recipeId
	}: ConfigStepAdjustmentProps = $props();

	// let selectedOption = $state(stepAdjustmentSelectedOption.option);

	// console.log('ConfigStepAdjustment selectedOption ' + selectedOption + 'stepAdjustmentSelectedOption', stepAdjustmentSelectedOption, 'stepAdjustmentAvailableOptions.options [' + stepAdjustmentAvailableOptions.options + ']');
	// if(!stepAdjustmentAvailableOptions.options.includes(selectedOption)) {
	//     console.log('selectedOption not in stepAdjustmentAvailableOptions.options ' + stepAdjustmentAvailableOptions.options + ', set with default ' + stepAdjustmentSelectedOption.option);
	//     selectedOption = stepAdjustmentSelectedOption.option;
	// }

	// $effect(() => {
	//     $inspect.trace();
	//     console.log('ConfigStepAdjustment handleSelect selectedOption=' + selectedOption);
	//     // handleSelect(stepAdjustmentAvailableOptions.stepAdjustmentName, selectedOption);
	// });

	// const handleChecked = () => {
	//     console.log('handleChecked stepAdjustmentName=' + stepAdjustmentAvailableOptions.stepAdjustmentName + ' selectedOption=' + selectedOption);
	//     handleSelect(stepAdjustmentAvailableOptions.stepAdjustmentName, selectedOption);
	// }

	const handleOnClick = (option: string) => {
		// console.log('handleOnClick stepAdjustmentName=' + stepAdjustmentAvailableOptions.stepAdjustmentName + ' option=' + option);
		handleSelect(stepAdjustmentAvailableOptions.stepAdjustmentName, option);
	};
	// console.log('stepAdjustmentAvailableOptions', stepAdjustmentAvailableOptions, 'stepAdjustmentSelectedOption', stepAdjustmentSelectedOption);

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
<div class="text-sm font-bold mb-2">
	{getStepAdjustmentTitleMessageKey(stepAdjustmentSelectedOption.stepAdjustmentName, recipeId)}
</div>

<fieldset class="flex flex-wrap gap-2">
	{#each stepAdjustmentAvailableOptions.options as availableOption}
		<div>
			<!-- <div>availableOption={availableOption} selectedOption={selectedOption}</div> -->
			<!-- <label class="flex cursor-pointer items-center justify-center rounded 
            {availableOption === selectedOption ? 'border border-black bg-black px-2 py-1 text-white' : 'border border-gray-300 bg-white px-2 py-1 text-gray-900' }
            hover:border-gray-900 
            has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
        >
          <input type="radio" 
            name={stepAdjustmentAvailableOptions.stepAdjustmentName + 'Radio'} 
            bind:group={selectedOption}
            onchange={handleChecked}
            value={availableOption} 
            class="sr-only"
          />
    
          <p class="text-xs font-bold">{getStepAdjustmentOptionMessageKey(stepAdjustmentAvailableOptions.stepAdjustmentName, availableOption)}</p>
        </label> -->

			<button
				class="flex cursor-pointer items-center justify-center rounded
            {availableOption === stepAdjustmentSelectedOption.option
					? 'border border-black bg-black px-2 py-1 text-white'
					: 'border border-gray-300 bg-white px-2 py-1 text-gray-900'}
            hover:border-gray-900"
				onclick={() => handleOnClick(availableOption)}
			>
				<span class="text-xs font-bold"
					>{getStepAdjustmentOptionMessageKey(
						stepAdjustmentAvailableOptions.stepAdjustmentName,
						availableOption
					)}</span
				>
			</button>
		</div>
	{/each}
</fieldset>
