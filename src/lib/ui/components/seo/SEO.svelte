<script lang="ts">
	import { page } from '$app/state';

	interface SEOProps {
		title?: string;
		description?: string;
		image?: string;
		type?: string;
	}

	let {
		title = 'Coffee Recipe Calculator',
		description = 'Brew your perfect cup of coffee with great recipes with precise measurements and ratios and timer',
		image,
		type = 'website'
	}: SEOProps = $props();

	$effect(() => {
		// Update meta tags reactively
		document.title = title;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={page.url.href} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	{#if image}
		<meta property="twitter:image" content={image} />
	{/if}
</svelte:head>
