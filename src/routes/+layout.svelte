<script>
	import "../app.css";
    import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n.js'

	import { setStopWatchStore } from "$lib/runes/stopwatch";
	import { setCoffeeRecipeStore } from "$lib/runes/coffee-recipe";

	const { children } = $props()
	
	setStopWatchStore();
	setCoffeeRecipeStore();
	
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>