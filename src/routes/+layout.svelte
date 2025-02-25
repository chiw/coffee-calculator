<script>
	import '../app.css';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n.js';
	// import SEO from '$lib/ui/components/seo/SEO.svelte';
	import { page } from '$app/state';

	const { children } = $props();

	import { setSeoRunes } from '$lib/runes/seo/SeoRunes.svelte';
	import { setStopWatchRunes } from '$lib/runes/stopwatch';
	import { setCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';
	import LanguageSwitcher from '$lib/ui/components/lang/LanguageSwitcher.svelte';

	setSeoRunes();
	setStopWatchRunes();
	setCoffeeRecipeRunes();
</script>

<!-- <SEO /> -->

<ParaglideJS {i18n}>
	<div lang={page.data.lang || 'en'}>
		<!-- <LanguageSwitcher /> -->
		{@render children()}
	</div>
</ParaglideJS>
