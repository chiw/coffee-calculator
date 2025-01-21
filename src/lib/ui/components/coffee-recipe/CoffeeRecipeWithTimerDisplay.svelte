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
	import type { CoffeeParametersConfig, CoffeeRecipeSteps, StepAdjustmentAvailableOptions, StepAdjustmentSelectedOptionConfig, StepConfig, Timeframe } from '$lib/coffee-recipes/CoffeeRecipeTypes.d';
    import { Method46Flavor, Method46Concentration, StepAdjustment } from '$lib/coffee-recipes/CoffeeRecipeTypes.d';
	import { getCoffeeRecipeDefaultConfig } from '$lib/coffee-recipes/CoffeeRecipeConstants';
	import { getStepsDurationInSeconds, updateStepDurationInSeconds, updateSteps } from '$lib/coffee-recipes/CoffeeRecipesFactory';
	import { caculateCoffeeParameters } from '$lib/coffee-recipes/CoffeeParametersUtils';
	import { displayNumber } from '$lib/utils/NumberDisplayUtils';
	import SimpleModal from '../modal/SimpleModal.svelte';
	import ConfigMethod46 from './ConfigMethod46.svelte';
	import { calculateMethod46Steps, getRatio40WaterInGrams, getRatio60WaterInGrams, PourRatio40Config, PourRatio60Config } from '$lib/coffee-recipes/Method46Utils';
	import Display46Method from './DisplayMethod46.svelte';
	import ConfigStepAdjustment from './step-adjustment/ConfigStepAdjustment.svelte';
	import { canEditStepAdjustment, createStepsFromStepAdjustments, getNewStepAdjustmentSelectedOptions, hasChangedStepAdjustmentSelectedOption, recreateSteps } from '$lib/coffee-recipes/StepAdjustmentUtils';
	import DisplayStepAdjustment from './step-adjustment/DisplayStepAdjustment.svelte';
	

    interface CoffeeRecipeWithTimerDisplayProps {
        coffeeRecipeSteps: CoffeeRecipeSteps
    }
    let { coffeeRecipeSteps } : CoffeeRecipeWithTimerDisplayProps = $props();

    console.log('CoffeeRecipeWithTimerDisplayProps coffeeRecipeSteps', coffeeRecipeSteps);

    const stopwatch: StopWatchRunes = getStopWatchRunes();

    const isRunningActiveStep = (elaspedTimeInSeconds:number, timeframe:Timeframe): boolean => {
        return stopwatch.isRunning() && isActiveStep(elaspedTimeInSeconds, timeframe);
    }

    const isRunningNonActiveStep = (elaspedTimeInSeconds:number, timeframe:Timeframe): boolean => {
        return stopwatch.isRunning() && !isActiveStep(elaspedTimeInSeconds, timeframe);
    }
    
    const isActiveStep = (elaspedTimeInSeconds:number, timeframe:Timeframe) : boolean => {
        return (elaspedTimeInSeconds >= timeframe.from) 
                && (elaspedTimeInSeconds <= timeframe.to);
    }

    const isStepCloseToFinish = (elaspedTimeInSeconds:number, timeframe:Timeframe, offset:number) => {
        return elaspedTimeInSeconds > (timeframe.to - offset);
    }

    // let show46MethodModal = $state(false);
    // let pourRatios40 = $state(Method46Flavor.STANDARD);
    // let pourRatios60 = $state(Method46Concentration.EVEN_STRONGER);
    // let pourRatios40WaterInGrams = $derived(getRatio40WaterInGrams(pourRatios40, coffeeRecipeRunes.coffeeParams.waterInGrams));
    // let pourRatios60WaterInGrams = $derived(getRatio60WaterInGrams(pourRatios60, coffeeRecipeRunes.coffeeParams.waterInGrams));

    // $effect(() => {
    //     if(coffeeRecipeRunes.coffeeRecipe.is46Method) {
    //         coffeeRecipeRunes.stepsConfig = calculateMethod46Steps(pourRatios40, pourRatios60);
    //     }
    // });

    let showStepAdjustmentModal = $state(false);

    let inEditMode = $state(false);

    const updateRunesStepsConfig = (index: number, newVal: number) => {
        console.log('updateRunesStepsConfig', 'index', index, 'newVal', newVal);
        coffeeRecipeRunes.stepsConfig = updateStepDurationInSeconds(coffeeRecipeRunes.stepsConfig, index, newVal);
    }

    const recalculateStepsDurationAndTimeframe = (e, index) => {
        // console.log(
        //     'e.currentTarget.value:', e.currentTarget.value, 
        //     'index:', index, 
        //     'stepsDurationInSeconds:', coffeeRecipeSteps.stepsDurationInSeconds);

        let newVal = parseInt(e.currentTarget.value);
        
        updateRunesStepsConfig(index, newVal);
        
        // localStepsTimeframeDisplay = calculateStepsTimeframe(localStepsDurationInSeconds);
        // console.log(
        //     'recalculateStepsDurationAndTimeframe()  localStepsDurationInSeconds:', 
        //     localStepsDurationInSeconds, 'localStepsTimeframeDisplay:', localStepsTimeframeDisplay);
    }

    const resetStepsDurationToDefault = () => {
        let stepsDurationInSeconds: number[] = [];
        if(coffeeRecipeSteps.enableStepsAdjustments) {
            stepsDurationInSeconds = createStepsFromStepAdjustments(coffeeRecipeSteps.stepsAdjustments, coffeeRecipeSteps.stepAdjustmentSelectedOptions)
                .map(step => step.durationInSeconds);
            coffeeRecipeRunes.stepsConfig = updateSteps(coffeeRecipeRunes.stepsConfig, stepsDurationInSeconds);
        } else {
            coffeeRecipeRunes.stepsConfig = updateSteps(coffeeRecipeRunes.stepsConfig, getStepsDurationInSeconds(getCoffeeRecipeDefaultConfig(coffeeRecipeRunes.recipeId).steps));
        }


        // if(coffeeRecipeRunes.coffeeRecipe.is46Method) {
        //     let stepsDurationInSeconds = getStepsDurationInSeconds(getCoffeeRecipeDefaultConfig(coffeeRecipeRunes.recipeId).steps);
        //     if(coffeeRecipeRunes.stepsConfig.length === 4) {
        //         // stepsDurationInSeconds = [45, 45, 60, 60]
        //         stepsDurationInSeconds = PourRatio40Config.STANDARD.durationInSeconds.concat(PourRatio60Config.STRONGER.durationInSeconds);
        //     } else if (coffeeRecipeRunes.stepsConfig.length === 3) {
        //         // stepsDurationInSeconds = [45, 45, 120]
        //         stepsDurationInSeconds = PourRatio40Config.STANDARD.durationInSeconds.concat(PourRatio60Config.LIGHTER.durationInSeconds);
        //     }
        //     coffeeRecipeRunes.stepsConfig = updateSteps(coffeeRecipeRunes.stepsConfig, stepsDurationInSeconds);
        // } else {
        //     coffeeRecipeRunes.stepsConfig = updateSteps(coffeeRecipeRunes.stepsConfig, getStepsDurationInSeconds(getCoffeeRecipeDefaultConfig(coffeeRecipeRunes.recipeId).steps));
        // }
    }


    const updateCoffeeParamsBeanInGrams = (value: number) => {
        console.log('updateCoffeeParamsBeanInGrams value, beanInGrams, newValue', value, coffeeRecipeRunes.coffeeParams.beanInGrams, coffeeRecipeRunes.coffeeParams.beanInGrams + value);
        let newBeanInGrams: number = displayNumber(coffeeRecipeRunes.coffeeParams.beanInGrams + value) * 1;
        updateCoffeeParams(newBeanInGrams);
    }

    const handleCoffeeParamsBeanInGramsInputChange = (event: InputEvent) => {
        // console.log('handleCoffeeParamsBeanInGramsInputChange', event);
        const { value } = event.target as HTMLInputElement;
        console.log('handleCoffeeParamsBeanInGramsInputChange value', value);
        updateCoffeeParams(value * 1);
    }

    const updateCoffeeParams = (beanInGrams: number) => {
        // console.log('updateCoffeeParams beanInGrams', beanInGrams);
        let newCoffeeParams = <CoffeeParametersConfig> {
            beanInGrams: beanInGrams,
            coffeeToWaterRatio: coffeeRecipeRunes.coffeeParams.coffeeToWaterRatio,
            waterInGrams: coffeeRecipeRunes.coffeeParams.waterInGrams
        }
        newCoffeeParams = caculateCoffeeParameters(newCoffeeParams);
        console.log('updateCoffeeParams newCoffeeParams', newCoffeeParams);

        coffeeRecipeRunes.coffeeParams = newCoffeeParams;
    }

    const getStepAdjustmentAvailableOptions = (stepAdjustment: string): StepAdjustmentAvailableOptions[] => {
        let availableOptions = coffeeRecipeSteps.stepAdjustmentAvailableOptions?.filter(availableOptions => availableOptions.stepAdjustment === stepAdjustment);
        // console.log('getStepAdjustmentAvailableOptions', stepAdjustment, availableOptions);
        return availableOptions;
    }

    // const getStepAdjustmentSelectedOption = (stepAdjustment: string) => {
    //     return coffeeRecipeSteps.stepAdjustmentSelectedOptions?.filter(option => option.stepAdjustment === stepAdjustment);
    // }

    const handleStepAdjustmentSelectedOption = (stepAdjustment: string, selectedOption: string) => {
        console.log('handleStepAdjustmentSelectedOption ', stepAdjustment, selectedOption);
        let newSelectedOption: StepAdjustmentSelectedOptionConfig = <StepAdjustmentSelectedOptionConfig>{ stepAdjustment: stepAdjustment, selectedOption: selectedOption};
        if(hasChangedStepAdjustmentSelectedOption(coffeeRecipeSteps.stepAdjustmentSelectedOptions, newSelectedOption)) {
            coffeeRecipeRunes.stepAdjustmentSelectedOptions = getNewStepAdjustmentSelectedOptions(coffeeRecipeSteps.stepAdjustmentSelectedOptions, newSelectedOption);
            coffeeRecipeRunes.stepsConfig = recreateSteps(coffeeRecipeRunes.recipeId, 
                coffeeRecipeSteps.stepAdjustmentSelectedOptions, newSelectedOption);
        }
    }

</script>

<div class="flex flex-row">
    {#if coffeeRecipeSteps.isTimerRecipe}
        <div class="m-1 p-2 w-[6rem]">
            <StopwatchDisplay timerInSeconds={coffeeRecipeSteps.timerInSeconds} />
        </div>
    {/if}
    <div>    
        <CoffeeParametersDisplay
            coffeeParameters={coffeeRecipeRunes.coffeeParams}
            editEnabled={StopWatchState.NEW === stopwatch.stopwatchState}
            handleBtnClick={updateCoffeeParamsBeanInGrams} 
            handleInputChange={handleCoffeeParamsBeanInGramsInputChange} />
    </div>
</div>

<div>
    <div>
        
    </div>
    <div class="flex flex-row-reverse items-center mt-1">
        {#if !stopwatch.isRunning()}
            {#if inEditMode}
                <button class="flex flex-row border border-solid border-black rounded border-1 items-center bg-black w-18 px-1 ba" onclick={() => { inEditMode = !inEditMode }}>
                    <iconify-icon icon="material-symbols-light:check-circle-outline-rounded"
                        class="text-[22px] hover:text-white text-white">
                    </iconify-icon>
                    <span class="font-bold text-xs text-white">{m.label_finish_edit()}</span>
                </button>

                <button class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1 mr-1" onclick={resetStepsDurationToDefault}>
                    <iconify-icon icon="material-symbols-light:refresh-rounded"
                        class="text-[22px] hover:text-slate-600">
                    </iconify-icon>
                    <span class="font-bold text-xs">{m.label_default()}</span>
                </button>
            {:else}
                <button class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1" onclick={() => { inEditMode = !inEditMode }}>
                    
                    <iconify-icon icon="material-symbols-light:timer-outline"
                        class="text-[22px] hover:text-slate-600">
                    </iconify-icon>
                    <span class="font-bold text-xs">{m.label_edit()}</span>
                </button>
            {/if}

            {#if coffeeRecipeRunes.coffeeRecipe.enableStepsAdjustments && !inEditMode}
                <button class="flex flex-row border border-solid border-black rounded border-1 items-center w-18 px-1 mr-1" onclick={() => { showStepAdjustmentModal = !showStepAdjustmentModal }}>
                    <iconify-icon icon="material-symbols-light:discover-tune-rounded"
                        class="text-[22px] hover:text-slate-600">
                    </iconify-icon>
                    <span class="font-bold text-xs">{m.label_46_method_adjust()}</span>
                </button>
            {/if}
        {/if}
    </div>
</div>

{#snippet stepRowTimeFrameAndSwitchStateDisplay(step, highlightStep)}
    <div class="border border-solid border-slate-600">        
        {#if coffeeRecipeSteps.isImmersionDripperRecipe}
            <SwitchStateDisplay 
                switchState={step.switchState} isImmersionDripperRecipe={coffeeRecipeSteps.isImmersionDripperRecipe} 
                highlightState={highlightStep} showTimeframeEndTime={coffeeRecipeSteps.showTimeframeEndTime} durationInSeconds={step.durationInSeconds}/>
        {:else}
            <TimeframeDurationDisplay durationInSeconds={step.durationInSeconds} pouringStage={step.stage} />
        {/if}
        
        {#if step.timeFrame && shouldDisplayTimeframe(step)}
            <StepTimeFrameDisplay timeFrame={step.timeFrame} showTimeframeEndTime={coffeeRecipeSteps.showTimeframeEndTime} highlightStep={highlightStep}/>
        {/if}
    </div>

    {#if step.timeFrame} 
        <StepMessageDisplay step={step} />
    {/if}
{/snippet}

{#snippet stepRowDisplay(step, highlightStep)}
    {@render stepRowTimeFrameAndSwitchStateDisplay(step, highlightStep)}
{/snippet}

{#snippet stepRowDisplayWithEdit(index, step, highlightStep)}
    {@render stepRowTimeFrameAndSwitchStateDisplay(step, highlightStep)}

    {#if inEditMode}
       <button onclick={() => updateRunesStepsConfig(index, step.durationInSeconds -= 1) }>
            <iconify-icon icon="mdi-light:minus-circle"
                class="text-[30px] hover:text-slate-600">
            </iconify-icon>
        </button>

        <input type="number" class="border border-solid text-center w-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
            bind:value={step.durationInSeconds}
            oninput={(e) => recalculateStepsDurationAndTimeframe(e, index)} />
        <span class="font-normal text-s">s</span>

        <button onclick={() => updateRunesStepsConfig(index, step.durationInSeconds += 1) }>
            <iconify-icon icon="mdi-light:plus-circle"
                class="text-[30px] hover:text-slate-600">
            </iconify-icon>
        </button>
    {/if}
{/snippet}


<div class="flex flex-col mb-1">
    {#if coffeeRecipeSteps.steps}
        <div class="flex flex-col divide-y divide-slate-300 py-0 ">
        <!-- <div class="flex flex-col py-0 "> -->
        {#each coffeeRecipeSteps.steps as step, index }
            {#if (isRunningActiveStep(stopwatch.elaspedTimeInSeconds, step.timeFrame) )}
                {#if (!isStepCloseToFinish(stopwatch.elaspedTimeInSeconds, step.timeFrame, 7)) }
                    <div class="pl-2 py-0.5 flex items-center bg-gray-900 text-white">
                        {@render stepRowDisplay(step, true)}
                    </div>
                    
                {:else}
                    <div class="pl-2 py-0.5 flex items-center bg-gray-900 text-white animate-pulse ">
                        {@render stepRowDisplay(step, true)}
                    </div>
                {/if}
            {:else if (isRunningNonActiveStep(stopwatch.elaspedTimeInSeconds, step.timeFrame))}
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
		<div class="font-bold">{m.label_46_method_adjust_title()}
			<!-- <small><em>adjective</em> mod·al \ˈmō-dəl\</small> -->
        </div>
	{/snippet}

    <!-- <ConfigMethod46 bind:pourRatios40={pourRatios40} bind:pourRatios60={pourRatios60} /> -->

    {#if coffeeRecipeSteps.enableStepsAdjustments}
    {#each coffeeRecipeSteps.stepAdjustmentSelectedOptions as selectedOption}
        {#if canEditStepAdjustment(coffeeRecipeSteps.stepsAdjustments, selectedOption.stepAdjustment) }
            <ConfigStepAdjustment
                stepAdjustmentSelectedOption={selectedOption} 
                stepAdjustmentAvailableOptions={getStepAdjustmentAvailableOptions(selectedOption.stepAdjustment)[0]} 
                handleSelect={handleStepAdjustmentSelectedOption} />
        {/if}
    {/each}
    

    

    <br/>

    <!-- <Display46Method 
        pourRatios40={pourRatios40} pourRatios60={pourRatios60} 
        pourRatios40WaterInGrams={pourRatios40WaterInGrams}
        pourRatios60WaterInGrams={pourRatios60WaterInGrams} /> -->

    <!-- <Display46Method 
        pourRatios40={pourRatios40} pourRatios60={pourRatios60} 
        pourRatios40WaterInGrams={coffeeRecipeSteps.steps.filter(step => step.stepAdjustment && step.stepAdjustment === 'twoStepsRatios').map(step => step.stepWaterInfo?.waterInGrams)}
        pourRatios60WaterInGrams={coffeeRecipeSteps.steps.filter(step => step.stepAdjustment && step.stepAdjustment === 'pourDivisions').map(step => step.stepWaterInfo?.waterInGrams)} /> -->
    
    <DisplayStepAdjustment 
        stepAdjustmentSelectedOptions={coffeeRecipeSteps.stepAdjustmentSelectedOptions}
        steps={coffeeRecipeSteps.steps} />
    
    {/if}
    
</SimpleModal>
