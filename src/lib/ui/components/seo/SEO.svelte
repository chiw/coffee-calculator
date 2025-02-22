<script lang="ts">
    import { page } from '$app/state';
    import { getSeoRunes } from '$lib/runes/seo/SeoRunes.svelte';
    import { i18n } from '$lib/i18n.js';
    import { base } from '$app/paths';
    import { dirtyFixFullUrlPath, getFullUrl } from '$lib/utils/url';

    const path = page.url.pathname;
    console.log('SEO page.url.pathname', path);
    
    // Remove the base path from pathname if it exists
    const pathWithoutBase = path.startsWith(base) ? path.slice(base.length) : path;
    let dirtyFixPath = dirtyFixFullUrlPath(pathWithoutBase);

    const seoRunes = getSeoRunes();
    const canonicalUrl = $derived(getFullUrl(dirtyFixPath));
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
            href={getFullUrl(`/${locale}${dirtyFixPath}`)} 
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