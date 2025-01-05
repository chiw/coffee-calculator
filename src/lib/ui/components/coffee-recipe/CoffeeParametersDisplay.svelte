<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import 'iconify-icon';

    import { displayNumber } from '$lib/utils/NumberDisplayUtils';
	
    let { coffeeParameters, editEnabled, beanInGramsOffset=0.1, handleBtnClick, handleInputChange } = $props();
</script>

<div class="mt-3">
    <div class="flex flex-row">
        <div class="flex-col mr-2">
            <div class="font-normal text-xs">{m.label_coffee_bean()}</div>
            <div class="flex flex-row items-center justify-center m-1 w-40">
                {#if editEnabled }
                    <!---<button class="w-7 h-7 rounded-full border border-slate-400 text-black hover:bg-black hover:text-white font-bold" onclick={() => coffeeRecipeRunes.beanInGrams-=1}>&minus;</button>-->
                    <iconify-icon icon="mdi-light:minus-circle"
                        class="text-[30px] hover:text-slate-600"
                        onclick={() => handleBtnClick(-beanInGramsOffset)}>
                    </iconify-icon>
                    <!-- <input class="ml-2 mr-1 border border-slate-200 text-center text-xl font-bold italic max-w-16" bind:value={coffeeRecipeRunes.coffeeParams.beanInGrams} />  -->
                    <input type="number" class="ml-2 mr-1 border border-slate-200 text-center text-xl font-bold italic max-w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                            bind:value={coffeeParameters.beanInGrams} 
                            oninput={handleInputChange}/>
                    <div class="mr-2">(g)</div>
                    <!--<button class="w-7 h-7 rounded-full border border-slate-400 text-black hover:bg-black hover:text-white font-bold" onclick={() => coffeeRecipeRunes.beanInGrams+=1}>&plus;</button>-->
                    <iconify-icon icon="mdi-light:plus-circle"
                        class="text-[30px] hover:text-slate-600"
                        onclick={() => handleBtnClick(beanInGramsOffset)}>
                    </iconify-icon>
                {:else}
                    <input class="ml-2 mr-1 border border-slate-200 text-center text-xl font-bold italic max-w-16 disabled:opacity-100 disabled:bg-transparent" 
                        bind:value={coffeeParameters.beanInGrams}
                        disabled=true 
                        /> 
                    <div class="mr-2">(g)</div>
                {/if}            
            </div>
        </div>

        <div class=" flex flex-col">
            <div class="flex flex-col mr-2">
                <div class="font-normal text-xs">{m.label_coffee_to_water_ratio()}</div>
                <div class="flex flex-row ">
                    <div class="mx-2 border-none border-slate-200 w-1 text-xl font-bold italic">1:</div>
                    <div class="ml-1 text-xl font-bold italic">{displayNumber(coffeeParameters.coffeeToWaterRatio)}</div>
                </div>
            </div>

            <div class="flex flex-col mr-2">
                <div class="font-normal text-xs">{m.label_water()}</div>
                <div class="flex flex-row ">
                    <div class="ml-2 mr-1 border-none border-slate-200  text-xl font-bold italic">{displayNumber(coffeeParameters.waterInGrams)}(g)</div>
                </div>
            </div>
        </div>
    </div>
</div>