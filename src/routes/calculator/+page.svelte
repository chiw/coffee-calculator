<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import 'iconify-icon';

    import CoffeeCalculator from '$lib/ui/components/coffee-recipe/CoffeeCalculator.svelte';

	// import { displayNumber } from "$lib/utils/NumberDisplayUtils";
	import type { CoffeeParametersConfig } from '$lib/coffee-recipes/CoffeeRecipeTypes';
	import { LanguageSwitcher } from '$lib/ui/components/coffee-recipe';
	// import { caculateCoffeeParameters } from '$lib/coffee-recipes/CoffeeParametersUtils';

    // let defaultCoffeeParameters : CoffeeParametersConfig = {
    //     beanInGrams: 15,
    //     coffeeToWaterRatio: 15,
    //     waterInGrams: -1
    // }

    let defaultCoffeeParameters : CoffeeParametersConfig = {
        beanInGrams: 15,
        coffeeToWaterRatio: -1,
        waterInGrams: 300
    }

    // let coffeeParameters = $state(caculateCoffeeParameters(defaultCoffeeParameters));

    // const handleCoffeeParamsBeanInGramsInputChange = (event: InputEvent) => {
	// 	// console.log('handleCoffeeParamsBeanInGramsInputChange', event);
	// 	const { value } = event.target as HTMLInputElement;
	// 	// console.log('handleCoffeeParamsBeanInGramsInputChange value', value);

    //     let inCoffeeParameters = <CoffeeParametersConfig> { 
    //         beanInGrams: parseInt(value),
    //         coffeeToWaterRatio: coffeeParameters.coffeeToWaterRatio,
    //         waterInGrams: coffeeParameters.waterInGrams
    //     };

	// 	coffeeParameters = caculateCoffeeParameters(inCoffeeParameters);
	// };

    let calculationMethod = $state('calculateWater');

    const onClickCalculationMethod = (method: string) => {
        calculationMethod = method;
    }

</script>

<div class="m-3">
    
    <div class="flex flex-row items-stretch">
        <div class="grow font-bold text-center">{m.label_calculator_title()}</div>
        <div class="grow-0"><LanguageSwitcher /></div>
    </div>
    


    <div role="tablist" aria-orientation="horizontal" data-orientation="horizontal" 
        class="bg-zinc-100 text-muted-foreground h-10 items-center justify-center rounded-md p-1 grid w-full grid-cols-2">
        <button role="tab" data-state="active" tabindex="0"
            class="ring-offset-background focus-visible:ring-ring 
            {calculationMethod === 'calculateWater' ? "bg-black text-white" : ""}
            data-[state=active]:bg-background data-[state=active]:text-foreground 
            inline-flex items-center justify-center whitespace-nowrap 
            rounded-sm px-3 py-1.5 text-sm font-medium transition-all 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
            onclick={() => onClickCalculationMethod('calculateWater')}>{m.label_calculator_calculateWater()}</button>
        <button role="tab" data-state="inactive" tabindex="-1"
            class="ring-offset-background focus-visible:ring-ring
            {calculationMethod === 'calculateRatio' ? "bg-black text-white" : ""}
            data-[state=active]:bg-background data-[state=active]:text-foreground 
            inline-flex items-center justify-center whitespace-nowrap 
            rounded-sm px-3 py-1.5 text-sm font-medium transition-all 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
            onclick={() => onClickCalculationMethod('calculateRatio')}>{m.label_calculator_calculateRatio()}</button>
    </div>

    

    <CoffeeCalculator inCoffeeParameters={defaultCoffeeParameters} calculationMethod={calculationMethod} />
</div>