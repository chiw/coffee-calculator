<script>
	import "../app.css";
    import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n.js'

	const { children } = $props()

	import { setContext } from "svelte";

	import { createStopwatch } from '$lib/runes/Stopwatch.svelte';
	const stopwatch = createStopwatch();
	setContext("stopwatch", stopwatch);

	import { createCoffeeRecipeStore } from '$lib/runes/CoffeeRecipeStore.svelte';    
    const coffeeRecipeStore = createCoffeeRecipeStore();
	setContext("coffeeRecipeStore", coffeeRecipeStore);
	
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>