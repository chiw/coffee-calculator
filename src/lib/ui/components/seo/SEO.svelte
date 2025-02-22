<script lang="ts">
    import { page } from '$app/stores';
    import { getSeoRunes } from '$lib/runes/seo/SeoRunes.svelte';
    import { i18n } from '$lib/i18n.js';
    import { getFullUrl } from '$lib/utils/url';

    const path = $page.url.pathname;
    console.log('SEO page.url.pathname', path);

    const seoRunes = getSeoRunes();
    const canonicalUrl = $derived(getFullUrl($page.url.pathname));
    const structuredData = $derived(seoRunes.getStructuredData());
    
    // Create a safe JSON string for the structured data
    function getStructuredDataString() {
        return JSON.stringify(structuredData, null, 2);
    }
</script>

<svelte:head>
    <title>{seoRunes.state.title}</title>
    <meta name="description" content={seoRunes.state.description} />
    <meta name="keywords" content="coffee calculator, coffee recipes, coffee brewing, pour over coffee, drip coffee, brewing timer, {seoRunes.state.keywords || ''}" />
    <link rel="canonical" href={canonicalUrl} />
    
    <!-- Language alternate links -->
    {#each i18n.locales as locale}
        <link 
            rel="alternate" 
            hreflang={locale} 
            href={getFullUrl(`/${locale}${$page.url.pathname}`)} 
        />
    {/each}

    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={seoRunes.state.title} />
    <meta property="og:description" content={seoRunes.state.description} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:site_name" content="Coffee Calculator Recipes" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seoRunes.state.title} />
    <meta name="twitter:description" content={seoRunes.state.description} />

    <!-- Structured Data -->
    {@html `<script type="application/ld+json">${getStructuredDataString()}</script>`}
</svelte:head>