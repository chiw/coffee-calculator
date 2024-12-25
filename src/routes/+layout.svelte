<script>
	import "../app.css";
    import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n.js'

	const { children } = $props()
	
	import { setStopWatchRunes } from "$lib/runes/stopwatch";
	import { setCoffeeRecipeRunes } from "$lib/runes/coffee-recipe";
	import LanguageSwitcher from "$lib/ui/components/lang/LanguageSwitcher.svelte";
	setStopWatchRunes();
	setCoffeeRecipeRunes();
	
</script>

<ParaglideJS {i18n}>
	<!-- <LanguageSwitcher /> -->
	{@render children()}	
</ParaglideJS>