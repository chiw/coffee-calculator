<script lang="ts">
	import { getRatio40WaterInGrams, getRatio60WaterInGrams } from "$lib/coffee-recipes/Method46Utils";
	import type { Method46Flavor, Method46Concentration } from "$lib/coffee-recipes/CoffeeRecipeTypes.d";
	import { displayNumber } from "$lib/utils/NumberDisplayUtils";
	import { Method46ConcentrationKey, method46FlavorKey } from "./CoffeeReceipeMessageKeys";

    interface Display46MethodProps {
        pourRatios40: Method46Flavor,
        pourRatios60: Method46Concentration,
        pourRatios40WaterInGrams: number[],
        pourRatios60WaterInGrams: number[]
    }

    let { pourRatios40, pourRatios60, pourRatios40WaterInGrams, pourRatios60WaterInGrams } = $props();

</script>

<table class="w-full border border-gray-300">
    <tbody>
        <tr>
            <td class="border border-gray-300">
                <div class="text-sm font-bold ml-2">40%</div>
                <div class="text-sm ml-2">{method46FlavorKey(pourRatios40)}</div>
            </td>            
            <td class="border border-gray-300">
                {#if pourRatios40WaterInGrams}
                    {#each pourRatios40WaterInGrams as waterInGrams}
                        <!-- <div class="bg-black text-white text-center rounded text-xs m-1 p-1 w-12 font-bold">{displayNumber(waterInGrams)}g</div> -->
                        <div class="bg-black text-white text-center rounded text-xs m-1 p-1 w-12 font-bold">{waterInGrams}g</div>
                    {/each}
                {/if}                
            </td>
        </tr>
        <tr>
            <td class="border border-gray-300">
                <div class="text-sm font-bold ml-2">60%</div>
                <div class="text-sm ml-2">{Method46ConcentrationKey(pourRatios60)}</div>
            </td>
            <td class="border border-gray-300">
                {#if pourRatios60WaterInGrams}
                    {#each pourRatios60WaterInGrams as waterInGrams}
                    <!-- <div class="bg-black text-white text-center rounded text-xs m-1 p-1 w-12 font-bold">{displayNumber(waterInGrams)}g</div> -->
                    <div class="bg-black text-white text-center rounded text-xs m-1 p-1 w-12 font-bold">{waterInGrams}g</div>
                    {/each}
                {/if}
            </td>
        </tr>
    </tbody>
</table>