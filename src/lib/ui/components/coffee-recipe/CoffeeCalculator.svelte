<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import 'iconify-icon';

    import { displayNumber } from "$lib/utils/NumberDisplayUtils";
	import { caculateCoffeeParameters } from '$lib/coffee-recipes/CoffeeParametersUtils';
	import type { CoffeeParametersConfig, CoffeeParametersConfigDisplay } from '$lib/coffee-recipes/CoffeeRecipeTypes';
    
    let { inCoffeeParameters, calculationMethod} = $props();

    let coffeeParameters = $state(caculateCoffeeParameters(inCoffeeParameters));

    const createCoffeeParametersConfigDisplay = (coffeeParametersConfig: CoffeeParametersConfig): CoffeeParametersConfigDisplay => {
        let coffeeParametersDisplay = <CoffeeParametersConfigDisplay> {
            beanInGrams: '' + coffeeParameters.beanInGrams,
            coffeeToWaterRatio: '' + (coffeeParameters.coffeeToWaterRatio > -1 ? coffeeParameters.coffeeToWaterRatio : 0),
            waterInGrams: '' + (coffeeParameters.waterInGrams > 0 ? coffeeParameters.waterInGrams : 0)
        }

        console.log('createCoffeeParametersConfigDisplay', coffeeParametersDisplay);

        return coffeeParametersDisplay;
    }

    let coffeeParametersConfigDisplay = $derived(createCoffeeParametersConfigDisplay(coffeeParameters));

    const determineEditableFieldOrder = (method: string) => {
        const defaultOrder = ['coffee', 'ratio'];
        if(method === 'calculateRatio') {
            return ['coffee', 'water'];
        } else if (method === 'calculateWater') {
            return defaultOrder;
        } else {
            return defaultOrder;
        }
    }

    const determineDisplayOnlyFieldOrder = (method: string) => {
        const defaultDisplayOnlyField = ['water'];
        if(method === 'calculateRatio') {
            return ['ratio'];
        } else if (method === 'calculateWater') {
            return defaultDisplayOnlyField;
        } else {
            return defaultDisplayOnlyField;
        }
    }

    let editableFieldOrders = $derived(determineEditableFieldOrder(calculationMethod));
    let displayOnlyFieldOrders = $derived(determineDisplayOnlyFieldOrder(calculationMethod));

    const isEmptyOrNullStr = (str: string): boolean => {
        if (typeof str === "string" && str.length === 0) {
            console.log("The string is empty");
            return true;
        } else if (str === null) {
            console.log("The string is null");
            return true;
        }
        return false;
    }

    const toNumber = (value: string, min: number = 0) => {
        // console.log('toNumber', value, min);

        let num = isEmptyOrNullStr(value) ? 0 : (value * 1);

        // let num = value * 1;
        num = num < min ? min : num;
        console.log('toNumber value:', value, 'min:', min, 'num:', num); 
        return num;
    };

    

    const createNewCoffeeParameters = (beanInGrams: number, coffeeToWaterRatio: number, waterInGrams: number): CoffeeParametersConfig => {
        let newCoffeeParamsConfig = <CoffeeParametersConfig> { 
            beanInGrams: beanInGrams,
            coffeeToWaterRatio: coffeeToWaterRatio,
            waterInGrams: waterInGrams
        };
        let result = caculateCoffeeParameters(newCoffeeParamsConfig);
        console.log('createNewCoffeeParameters', result);
        return result;
    }   

    const handleCoffeeParamsBeanInGramsInputChange = (event: InputEvent) => {
		// console.log('handleCoffeeParamsBeanInGramsInputChange', event);
		const { value } = event.target as HTMLInputElement;
		console.log('handleCoffeeParamsBeanInGramsInputChange value', value);

        
        coffeeParameters = createNewCoffeeParameters(
            toNumber(value), 
            coffeeParameters.coffeeToWaterRatio, 
            coffeeParameters.waterInGrams
        );
	};

    const handleCoffeeParamsCoffeeToWaterRatioInputChange = (event: InputEvent) => {
        // console.log('handleCoffeeParamsCoffeeToWaterRatioInputChange', event);
        const { value } = event.target as HTMLInputElement;
        console.log('handleCoffeeParamsCoffeeToWaterRatioInputChange value', value);

        
        coffeeParameters = createNewCoffeeParameters(
            coffeeParameters.beanInGrams, 
            toNumber(value), 
            -1
        );
    };

    const handleCoffeeParamsWaterInGramsInputChange = (event: InputEvent) => {
        // console.log('handleCoffeeParamsWaterInGramsInputChange', event);
        const { value } = event.target as HTMLInputElement;
        console.log('handleCoffeeParamsWaterInGramsInputChange value', value);

        
        coffeeParameters = createNewCoffeeParameters(
            coffeeParameters.beanInGrams, 
            -1, 
            toNumber(value)
        );
    };
</script>


<div class="flex flex-row justify-center items-center place-content-center">
    <div class="flex flex-col ml-2 basis-1/2 items-center">
        {#each editableFieldOrders as field}
            {#if field === 'coffee'}
                <div class="flex-col mr-2 mt-1">
                    <div class="font-normal text-xs">{m.label_coffee_bean()}</div>
                    <!-- <div class="flex flex-row items-center justify-center m-1 w-40">				 -->
                    <div class="flex flex-row">
                        <label for="beanInput" class="sr-only">{m.label_coffee_bean()}</label>
                        <input
                            type="number"
                            id="beanInput"
                            class="ml-2 mr-1 border border-slate-200 text-center text-xl font-bold italic max-w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            bind:value={coffeeParametersConfigDisplay.beanInGrams}
                            oninput={handleCoffeeParamsBeanInGramsInputChange}
                        />
                        <div class="mr-2">(g)</div>
                    </div>
                </div>
            {/if}
            
            {#if field === 'ratio'}
                <div class="flex flex-col mr-2 mt-1">
                    <div class="font-normal text-xs">{m.label_coffee_to_water_ratio()}</div>
                    {#if calculationMethod === 'calculateWater'}
                        <div class="flex flex-row">
                            <span class="mx-2 border-none border-slate-200 w-1 text-xl font-bold italic">1:</span>
                            <input
                                type="number"
                                id="ratioInput"
                                class="ml-2 mr-1 border border-slate-200 text-center text-xl font-bold italic max-w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                bind:value={coffeeParametersConfigDisplay.coffeeToWaterRatio}
                                oninput={handleCoffeeParamsCoffeeToWaterRatioInputChange}
                            />
                        </div>
                    {:else}
                        <div class="flex flex-row">
                            <div class="mx-2 border-none border-slate-200 w-1 text-xl font-bold italic">1:</div>
                            <div class="ml-1 text-xl font-bold italic">
                                {displayNumber(coffeeParametersConfigDisplay.coffeeToWaterRatio)}
                            </div>
                        </div>
                    {/if}            
                </div>
            {/if}

            {#if field === 'water'}
                <div class="flex flex-col mr-2 mt-1">
                    <div class="font-normal text-xs">{m.label_water()}</div>
                    {#if calculationMethod === 'calculateRatio'}
                        <div class="flex flex-row">
                            <input
                                type="number"
                                id="waterInput"
                                class="ml-2 mr-1 border border-slate-200 text-center text-xl font-bold italic max-w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                bind:value={coffeeParameters.waterInGrams}
                                oninput={handleCoffeeParamsWaterInGramsInputChange} 
                            />
                            <div class="mr-2">(g)</div>
                        </div>
                    {:else}
                        <div class="flex flex-row">
                            <div class="ml-2 mr-1 border-none border-slate-200 text-xl font-bold italic">
                                {displayNumber(coffeeParameters.waterInGrams)}(g)
                            </div>
                        </div>
                    {/if}

                </div>
            {/if}
        {/each}
    </div>

    <!-- <div class="flex flex-col ml-2 basis-1/3 items-center">
        <iconify-icon icon="material-symbols-light:play-arrow-rounded" class="text-[30px] hover:text-slate-600"
                    ></iconify-icon>
    </div> -->

    <div class="flex flex-col ml-2 basis-1/2 items-center">
        {#each displayOnlyFieldOrders as field}
            {#if field === 'ratio'}
                <div class="flex flex-col mr-2 mt-1">
                    <div class="font-normal text-xs">{m.label_coffee_to_water_ratio()}</div>
                    <div class="flex flex-row">
                        <div class="mx-2 border-none border-slate-200 w-1 text-xl font-bold italic">1:</div>
                        <div class="ml-1 text-xl font-bold italic">
                            {coffeeParametersConfigDisplay.coffeeToWaterRatio}
                        </div>
                    </div>
                </div>
            {/if}

            {#if field === 'water'}
                <div class="flex flex-col mr-2 mt-1">
                    <div class="font-normal text-xs">{m.label_water()}</div>
                    <div class="flex flex-row">
                        <div class="ml-2 mr-1 border-none border-slate-200 text-xl font-bold italic">
                            {coffeeParametersConfigDisplay.waterInGrams}(g)
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    
</div>