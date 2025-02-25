<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	import 'iconify-icon';

	import { StopWatchRunes, StopWatchState, getStopWatchRunes } from '$lib/runes/stopwatch';

	import { getCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';
	const coffeeRecipeRunes = getCoffeeRecipeRunes();

	import CoffeeParametersDisplay from './CoffeeParametersDisplay.svelte';

	import StepMessageDisplay from './StepMessageDisplay.svelte';

	import StepTimeFrameDisplay from './StepTimeFrameDisplay.svelte';
	import SwitchStateDisplay from './SwitchStateDisplay.svelte';

	import StopwatchDisplay from '../stopwatch/StopwatchDisplay.svelte';
	import { shouldDisplayTimeframe } from '$lib/utils/TimeframeDisplayUtils';
	import TimeframeDurationDisplay from './TimeframeDurationDisplay.svelte';
	import {
		type CoffeeParametersConfig,
		type CoffeeRecipeSteps,
		type RecipeChangeFactors,
		type StepAdjustmentSelectedOptionConfig,
		type StepControls,
		type Timeframe
	} from '$lib/coffee-recipes/CoffeeRecipeTypes.d';
	import { getCoffeeRecipeDefaultConfig } from '$lib/coffee-recipes/CoffeeRecipeConstants';
	import { getStepsDurationInSeconds } from '$lib/coffee-recipes/CoffeeRecipesFactory';
	import { caculateCoffeeParameters } from '$lib/coffee-recipes/CoffeeParametersUtils';
	import { displayNumber } from '$lib/utils/NumberDisplayUtils';
	import SimpleModal from '../modal/SimpleModal.svelte';
	import ConfigStepAdjustment from './step-adjustment/ConfigStepAdjustment.svelte';
	import {
		createStepsFromStepAdjustments,
		stepOptionsAreSelectable
	} from '$lib/coffee-recipes/StepAdjustmentUtils';
	import DisplayStepAdjustment from './step-adjustment/DisplayStepAdjustment.svelte';

	interface CoffeeRecipeWithTimerDisplayProps {
		coffeeRecipeSteps: CoffeeRecipeSteps;
	}
	let { coffeeRecipeSteps }: CoffeeRecipeWithTimerDisplayProps = $props();

	// console.log('CoffeeRecipeWithTimerDisplayProps coffeeRecipeSteps', coffeeRecipeSteps);

	const stopwatch: StopWatchRunes = getStopWatchRunes();

	const isRunningActiveStep = (elaspedTimeInSeconds: number, timeframe: Timeframe): boolean => {
		return stopwatch.isRunning() && isActiveStep(elaspedTimeInSeconds, timeframe);
	};

	const isRunningNonActiveStep = (elaspedTimeInSeconds: number, timeframe: Timeframe): boolean => {
		return stopwatch.isRunning() && !isActiveStep(elaspedTimeInSeconds, timeframe);
	};

	const isActiveStep = (elaspedTimeInSeconds: number, timeframe: Timeframe): boolean => {
		return elaspedTimeInSeconds >= timeframe.from && elaspedTimeInSeconds <= timeframe.to;
	};

	const isStepCloseToFinish = (
		elaspedTimeInSeconds: number,
		timeframe: Timeframe,
		offset: number
	) => {
		return elaspedTimeInSeconds > timeframe.to - offset;
	};

	let showStepAdjustmentModal = $state(false);

	let inEditMode = $state(false);

	const getClonedRecipeChangeFacotrs = (): RecipeChangeFactors => {
		return <RecipeChangeFactors>JSON.parse(JSON.stringify(coffeeRecipeSteps.recipeChangeFactors));
	};

	const updateRunesStepsConfig = (index: number, newVal: number) => {
		// console.log('updateRunesStepsConfig', 'index', index, 'newVal', newVal);

		let clonedRecipeChangeFactors: RecipeChangeFactors = getClonedRecipeChangeFacotrs();
		// console.log('updateRunesStepsConfig clonedRecipeChangeFactors', clonedRecipeChangeFactors);
		clonedRecipeChangeFactors.stepsDurationInSeconds[index] = newVal;
		clonedRecipeChangeFactors.factorsToUpdate = ['stepsDurationInSeconds'];

		updateRunesRecipeChangeFactors(clonedRecipeChangeFactors);
	};

	const recalculateStepsDurationAndTimeframe = (e, index) => {
		// console.log(
		//     'e.currentTarget.value:', e.currentTarget.value,
		//     'index:', index,
		//     'stepsDurationInSeconds:', coffeeRecipeSteps.stepsDurationInSeconds);

		let newVal = parseInt(e.currentTarget.value);

		updateRunesStepsConfig(index, newVal);
	};

	const resetAllRecipeChangeFactorsToDefault = () => {
		let defaultRecipeChangeFactors: RecipeChangeFactors =
			coffeeRecipeRunes.coffeeRecipe.defaultRecipeChangeFactors;
		// console.log('resetAllRecipeChangeFactorsToDefault defaultRecipeChangeFactors', defaultRecipeChangeFactors);

		updateRunesRecipeChangeFactors(defaultRecipeChangeFactors);
	};

	const resetStepsDurationToDefault = () => {
		let stepsDurationInSeconds: number[] = [];
		if (coffeeRecipeSteps.enableStepsAdjustments) {
			stepsDurationInSeconds = createStepsFromStepAdjustments(
				coffeeRecipeSteps.stepsAdjustments,
				coffeeRecipeSteps.recipeChangeFactors.stepControls?.selectedOptions
			).map((step) => step.durationInSeconds);
		} else {
			stepsDurationInSeconds = getStepsDurationInSeconds(
				getCoffeeRecipeDefaultConfig(coffeeRecipeRunes.recipeId).steps
			);
		}

		let clonedRecipeChangeFactors: RecipeChangeFactors = getClonedRecipeChangeFacotrs();
		clonedRecipeChangeFactors.stepsDurationInSeconds = stepsDurationInSeconds;
		clonedRecipeChangeFactors.factorsToUpdate = ['stepsDurationInSeconds'];

		updateRunesRecipeChangeFactors(clonedRecipeChangeFactors);
	};

	const updateCoffeeParamsBeanInGrams = (value: number) => {
		// console.log('updateCoffeeParamsBeanInGrams value, beanInGrams, newValue', value,
		// coffeeRecipeRunes.recipeChangeFactors.coffeeParameters.beanInGrams,
		// coffeeRecipeRunes.recipeChangeFactors.coffeeParameters.beanInGrams + value);
		let newBeanInGrams: number =
			displayNumber(coffeeRecipeRunes.recipeChangeFactors.coffeeParameters.beanInGrams + value) * 1;
		updateCoffeeParams(newBeanInGrams);
	};

	const handleCoffeeParamsBeanInGramsInputChange = (event: InputEvent) => {
		// console.log('handleCoffeeParamsBeanInGramsInputChange', event);
		const { value } = event.target as HTMLInputElement;
		// console.log('handleCoffeeParamsBeanInGramsInputChange value', value);
		updateCoffeeParams(value * 1);
	};

	const updateCoffeeParams = (beanInGrams: number) => {
		// console.log('updateCoffeeParams beanInGrams', beanInGrams);
		let newCoffeeParams = <CoffeeParametersConfig>{
			beanInGrams: beanInGrams,
			coffeeToWaterRatio: coffeeRecipeRunes.recipeChangeFactors.coffeeParameters.coffeeToWaterRatio,
			waterInGrams: coffeeRecipeRunes.recipeChangeFactors.coffeeParameters.waterInGrams
		};
		newCoffeeParams = caculateCoffeeParameters(newCoffeeParams);
		// console.log('updateCoffeeParams newCoffeeParams', newCoffeeParams);

		let clonedRecipeChangeFactors = getClonedRecipeChangeFacotrs();
		clonedRecipeChangeFactors.coffeeParameters = newCoffeeParams;
		clonedRecipeChangeFactors.factorsToUpdate = ['coffeeParameters'];

		updateRunesRecipeChangeFactors(clonedRecipeChangeFactors);
	};

	const handleStepAdjustmentSelectedOption = (stepAdjustment: string, selectedOption: string) => {
		// console.log('handleStepAdjustmentSelectedOption ', stepAdjustment, selectedOption);
		let newSelectedOption: StepAdjustmentSelectedOptionConfig = <
			StepAdjustmentSelectedOptionConfig
		>{ stepAdjustmentName: stepAdjustment, option: selectedOption };

		let clonedStepControls: StepControls = <StepControls>(
			JSON.parse(JSON.stringify(coffeeRecipeSteps.recipeChangeFactors.stepControls))
		);
		// console.log('handleStepAdjustmentSelectedOption clonedStepControls=', clonedStepControls);
		// console.log('handleStepAdjustmentSelectedOption newSelectedOption=', newSelectedOption);

		clonedStepControls.selectedOptions.forEach((selectedOption) => {
			if (selectedOption.stepAdjustmentName === newSelectedOption.stepAdjustmentName) {
				selectedOption.option = newSelectedOption.option;
			}
		});

		// console.log('handleStepAdjustmentSelectedOption updated clonedStepControls=', clonedStepControls);

		let clonedRecipeChangeFactors = getClonedRecipeChangeFacotrs();
		clonedRecipeChangeFactors.stepControls = clonedStepControls;
		clonedRecipeChangeFactors.factorsToUpdate = ['stepControls'];

		updateRunesRecipeChangeFactors(clonedRecipeChangeFactors);
	};

	const updateRunesRecipeChangeFactors = (recipeChangeFactors: RecipeChangeFactors) => {
		// console.log('updateRecipeChangeFactors recipeChangeFactors', recipeChangeFactors);
		coffeeRecipeRunes.recipeChangeFactors = recipeChangeFactors;
	};
</script>

<div class="flex flex-row">
	{#if coffeeRecipeSteps.isTimerRecipe}
		<div class="m-1 p-2 w-[6rem]">
			<StopwatchDisplay timerInSeconds={coffeeRecipeSteps.timerInSeconds} />
		</div>
	{/if}
	<div>
		<CoffeeParametersDisplay
			coffeeParameters={coffeeRecipeSteps.recipeChangeFactors.coffeeParameters}
			editEnabled={StopWatchState.NEW === stopwatch.stopwatchState}
			handleBtnClick={updateCoffeeParamsBeanInGrams}
			handleInputChange={handleCoffeeParamsBeanInGramsInputChange}
		/>
	</div>
</div>

<div>
	<div></div>
	<div class="flex flex-row-reverse items-center mt-1">
		{#if !stopwatch.isRunning()}
			{#if inEditMode}
				<button
					class="flex flex-row border border-solid border-black rounded border-1 items-center bg-black w-18 px-1 ba"
					onclick={() => {
						inEditMode = !inEditMode;
					}}
					aria-label={inEditMode ? "Finish editing" : "Edit time"}
				>
					<iconify-icon
						icon="material-symbols-light:check-circle-outline-rounded"
						class="text-[22px] hover:text-white text-white"
					></iconify-icon>
					<span class="font-bold text-xs text-white">{m.label_finish_edit()}</span>
				</button>

				{#if coffeeRecipeSteps.recipeChangeStatus && coffeeRecipeSteps.recipeChangeStatus.updatedStepsDurationInSeconds}
					<button
						class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1 mr-1"
						onclick={resetStepsDurationToDefault}
						aria-label="Reset to default time"
					>
						<iconify-icon
							icon="material-symbols-light:refresh-rounded"
							class="text-[22px] hover:text-slate-600"
						></iconify-icon>
						<span class="font-bold text-xs">{m.label_default_time()}</span>
					</button>
				{/if}
			{:else}
				<button
					class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1"
					onclick={() => {
						inEditMode = !inEditMode;
					}}
					aria-label={inEditMode ? "Finish editing" : "Edit time"}
				>
					<iconify-icon
						icon="material-symbols-light:timer-outline"
						class="text-[22px] hover:text-slate-600"
					></iconify-icon>
					<span class="font-bold text-xs">{m.label_edit_time()}</span>
				</button>
			{/if}

			{#if coffeeRecipeRunes.coffeeRecipe.enableStepsAdjustments && !inEditMode}
				<button
					class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1 mr-1"
					onclick={() => {
						showStepAdjustmentModal = !showStepAdjustmentModal;
					}}
					aria-label="Edit step adjustments"
				>
					<iconify-icon
						icon="material-symbols-light:discover-tune-rounded"
						class="text-[22px] hover:text-slate-600"
					></iconify-icon>
					<span class="font-bold text-xs">{m.label_edit_stepAdjustments()}</span>
				</button>
			{/if}

			{#if !inEditMode && coffeeRecipeSteps.recipeChangeStatus && (coffeeRecipeSteps.recipeChangeStatus.updatedStepsDurationInSeconds || coffeeRecipeSteps.recipeChangeStatus.updatedCoffeeParameters || coffeeRecipeSteps.recipeChangeStatus.updatedStepControls)}
				<button
					class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1 mr-1"
					onclick={resetAllRecipeChangeFactorsToDefault}
				>
					<iconify-icon
						icon="material-symbols-light:refresh-rounded"
						class="text-[22px] hover:text-slate-600"
					></iconify-icon>
					<span class="font-bold text-xs">{m.label_default()}</span>
				</button>
			{/if}
		{/if}
	</div>
</div>

{#snippet stepRowTimeFrameAndSwitchStateDisplay(step, highlightStep)}
	<div class="border border-solid border-slate-600">
		{#if coffeeRecipeSteps.isImmersionDripperRecipe}
			<SwitchStateDisplay
				switchState={step.switchState}
				isImmersionDripperRecipe={coffeeRecipeSteps.isImmersionDripperRecipe}
				highlightState={highlightStep}
				showTimeframeEndTime={coffeeRecipeSteps.showTimeframeEndTime}
				durationInSeconds={step.durationInSeconds}
			/>
		{:else}
			<TimeframeDurationDisplay
				durationInSeconds={step.durationInSeconds}
				pouringStage={step.stage}
			/>
		{/if}

		{#if step.timeFrame && shouldDisplayTimeframe(step)}
			<StepTimeFrameDisplay
				timeFrame={step.timeFrame}
				showTimeframeEndTime={coffeeRecipeSteps.showTimeframeEndTime}
				{highlightStep}
			/>
		{/if}
	</div>

	{#if step.timeFrame}
		<StepMessageDisplay {step} />
	{/if}
{/snippet}

{#snippet stepRowDisplay(step, highlightStep)}
	{@render stepRowTimeFrameAndSwitchStateDisplay(step, highlightStep)}
{/snippet}

{#snippet stepRowDisplayWithEdit(index, step, highlightStep)}
	{@render stepRowTimeFrameAndSwitchStateDisplay(step, highlightStep)}

	{#if inEditMode}
			<button 
				aria-label="Decrease duration by 1 second"
				onclick={() => updateRunesStepsConfig(index, (step.durationInSeconds -= 1))}
			>
				<iconify-icon 
					icon="mdi-light:minus-circle" 
					class="text-[30px] hover:text-slate-600"
				></iconify-icon>
			</button>

			<input
				type="number"
				class="border border-solid text-center w-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				bind:value={step.durationInSeconds}
				oninput={(e) => recalculateStepsDurationAndTimeframe(e, index)}
				aria-label="Step duration in seconds"
			/>
			<span class="font-normal text-s">s</span>

			<button 
				aria-label="Increase duration by 1 second"
				onclick={() => updateRunesStepsConfig(index, (step.durationInSeconds += 1))}
			>
				<iconify-icon 
					icon="mdi-light:plus-circle" 
					class="text-[30px] hover:text-slate-600"
				></iconify-icon>
			</button>
	{/if}
{/snippet}

<div class="flex flex-col mb-1">
	{#if coffeeRecipeSteps.steps}
		<div class="flex flex-col divide-y divide-slate-300 py-0">
			<!-- <div class="flex flex-col py-0 "> -->
			{#each coffeeRecipeSteps.steps as step, index}
				{#if isRunningActiveStep(stopwatch.elaspedTimeInSeconds, step.timeFrame)}
					{#if !isStepCloseToFinish(stopwatch.elaspedTimeInSeconds, step.timeFrame, 7)}
						<div class="pl-2 py-0.5 flex items-center bg-gray-900 text-white">
							{@render stepRowDisplay(step, true)}
						</div>
					{:else}
						<div class="pl-2 py-0.5 flex items-center bg-gray-900 text-white animate-pulse">
							{@render stepRowDisplay(step, true)}
						</div>
					{/if}
				{:else if isRunningNonActiveStep(stopwatch.elaspedTimeInSeconds, step.timeFrame)}
					<div class=" pl-2 py-0.5 flex items-center text-slate-300">
						{@render stepRowDisplay(step, false)}
					</div>
				{:else}
					<div class=" pl-2 py-0.5 flex items-center">
						{@render stepRowDisplayWithEdit(index, step, true)}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<SimpleModal bind:showModal={showStepAdjustmentModal}>
	{#snippet header()}
		<div class="font-bold">
			{m.label_edit_stepAdjustments_modal_title()}
			<!-- <small><em>adjective</em> mod·al \ˈmō-dəl\</small> -->
		</div>
	{/snippet}

	{#if coffeeRecipeSteps.enableStepsAdjustments}
		{#each coffeeRecipeSteps.recipeChangeFactors.stepControls.selectedOptions as selectedOption, index}
			{#if stepOptionsAreSelectable(coffeeRecipeSteps.recipeChangeFactors.stepControls.isSelectableFlags, selectedOption.stepAdjustmentName)}
				<!-- <div>{JSON.stringify(selectedOption)}</div> -->
				<ConfigStepAdjustment
					stepAdjustmentSelectedOption={selectedOption}
					stepAdjustmentAvailableOptions={coffeeRecipeSteps.recipeChangeFactors.stepControls
						.availableOptions[index]}
					handleSelect={handleStepAdjustmentSelectedOption}
					recipeId={coffeeRecipeRunes.coffeeRecipe.recipeId}
				/>
			{/if}
		{/each}

		<br />
		<DisplayStepAdjustment
			stepAdjustmentSelectedOptions={coffeeRecipeSteps.recipeChangeFactors.stepControls
				.selectedOptions}
			steps={coffeeRecipeSteps.steps}
			recipeId={coffeeRecipeRunes.coffeeRecipe.recipeId}
		/>
	{/if}
</SimpleModal>
