<script lang="ts">
    import * as m from '$lib/paraglide/messages.js';

    import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime";
    import { i18n } from "$lib/i18n";
	import { goto } from "$app/navigation"
    import { page } from "$app/stores";
	import { get } from "svelte/store"

    import { Globe } from 'lucide-svelte';

    /**
     * @param { import("$lib/paraglide/runtime").AvailableLanguageTag } newLanguage
     */
    function switchToLanguage(newLanguage) {
        const canonicalPath = i18n.route(get(page).url.pathname)
        const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage)
        goto( localisedPath)
    }

    let container;
    let showDropdown: boolean = false;

    const toggleDropdown = () => {
        showDropdown = !showDropdown;
    }

    const closeDropdown = () => {
        showDropdown = false;
    }
    /**
     * @type {Record<import("$lib/paraglide/runtime").AvailableLanguageTag, string>}
     */
    const locale_labels = {
        "en": m.label_locale_en,
        "zh-hk": m.label_locale_zh_hk
    }

    function onWindowClick(e) {
		if (container.contains(e.target) == false) {
            showDropdown = false;
        }
	}
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container}>
    <div id="dropdown-button" onclick="{toggleDropdown}"  class="w-[2rem] h-[2rem] border border-gray-400 rounded mx-1 px-1 py-1 cursor-pointer flex justify-between">
        <Globe/>
    </div>

    {#if showDropdown}
    <div id="dropdown-menu" class="absolute right-0 top-50 w-48  border border-gray-300 bg-white shadow-md mt-2" >
        {#each availableLanguageTags as lang}
            <!-- <div class="z-10 py-2 px-2 cursor-pointer hover:bg-gray-100" use:clickOutside onoutclick={closeDropdown} onclick={switchToLanguage(lang)}>{locale_labels[lang]()}</div> -->
            <a class="block px-4 py-2 text-gray-800 hover:bg-gray-300 "
                href={i18n.route($page.url.pathname)}
                hreflang={lang}
                aria-current={lang === languageTag() ? "page" : undefined}>
                {locale_labels[lang]()}
            </a>
        {/each}
    </div>
    {/if}
</div>

<!-- <select on:change={e => switchToLanguage(/** @type {any} */ (e).target.value)}>
    {#each availableLanguageTags as langTag}
        <option 
            value={langTag}
            selected={languageTag() === langTag}
            >{labels[langTag]}</option>
    {/each}
</select> -->

<!-- {#each availableLanguageTags as lang} -->
	<!-- the hreflang attribute decides which language the link points to -->
	<!-- <a 
		href={i18n.route($page.url.pathname)}
		hreflang={lang}
		aria-current={lang === languageTag() ? "page" : undefined}
	>
		{lang}
	</a> -->
<!-- {/each} -->