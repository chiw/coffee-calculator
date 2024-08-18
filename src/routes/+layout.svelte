<script>
	import "../app.css";
    import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n.js'

	const { children } = $props()
	
	import { setStopWatchStore } from "$lib/runes/stopwatch";
	import { setCoffeeRecipeStore } from "$lib/runes/coffee-recipe";
	import LanguageSwitcher from "$lib/ui/components/lang/LanguageSwitcher.svelte";
	setStopWatchStore();
	setCoffeeRecipeStore();
	
</script>

<ParaglideJS {i18n}>
	<!-- <LanguageSwitcher /> -->
	{@render children()}	
</ParaglideJS>