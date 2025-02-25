<script>
	import '../app.css';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n.js';
	import SEO from '$lib/ui/components/seo/SEO.svelte';
	import { page } from '$app/state';

	const { children } = $props();

	import { setStopWatchRunes } from '$lib/runes/stopwatch';
	import { setCoffeeRecipeRunes } from '$lib/runes/coffee-recipe';

	setStopWatchRunes();
	setCoffeeRecipeRunes();
</script>

<SEO />

<ParaglideJS {i18n}>
	<div lang={page.data.lang || 'en'}>
		{@render children()}
	</div>
</ParaglideJS>
